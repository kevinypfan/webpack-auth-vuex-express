const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: (value)=>{validator.isEmail(value)},
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  userImg: {
    type: String,
    require: true,
    default: 'https://fakeimg.pl/300/'
  },
  userNickname: {
    type: String,
    require: true
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id','email','userImg','userNickname']);
}

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  // console.log(user._id.toHexString(),'-----',user.id)
  var token = jwt.sign({_id: user._id.toHexString(), access},'abc123').toString();
  // console.log(jwt.sign({_id: user._id.toHexString(), access},'abc123'));
  user.tokens.push({access, token});

  return user.save().then(()=>{
    return token
  })
};

UserSchema.methods.removeToken = function (token) {
  var user = this;

  return user.update({
    $pull: {
      tokens: {token}
    }
  });
}

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;
  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    // return new Promise((resolve, reject)=>{
    //   reject();
    // });
    return Promise.reject(); //simple
  }
  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
}

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;

  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject("Unable this User");
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject("your password is incorrect");
        }
      });
    });
  });
}

UserSchema.pre('save', function (next) {
  var user = this;
  // console.log(user.isModified('password'))
  if (user.isModified('password')){
    bcrypt.genSalt(10, (err, salt)=>{
      // console.log('salt=',salt);
      bcrypt.hash(user.password, salt, (err, hash)=> {
        user.password = hash;
        // console.log('\n','hash=',hash);
        next();
      });
    });
  } else {
    next();
  }
});


var User = mongoose.model('User', UserSchema);

module.exports = {User}
