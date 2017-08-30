const _ = require('lodash');
const fallback = require('express-history-api-fallback');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const moment = require('moment')
const {ObjectID} = require('mongodb');
var {User} = require('./models/user');
var {Post} = require('./models/post');
var {authenticate} = require('./middleware/authenticate.js');

const app = express();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/UserTest', { useMongoClient: true });

app.use(bodyParser.json());

app.use(express.static(__dirname));
//跨站無限制d
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log(file)
    if (!fs.existsSync( `${__dirname}/public/${file.fieldname}`)){
        fs.mkdirSync(`${__dirname}/public/${file.fieldname}`);
    }
    cb(null,`${__dirname}/public/${file.fieldname}`)
    },
    filename: function (req, file, cb) {
      function getFileExtension1(filename) {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
      }
      var fileName = getFileExtension1(file.originalname);
      var date = Date.now()
      cb(null, `${moment(date).format("YYYYMMDD_HHmmss")}.${fileName}`)
    }
  })
var upload = multer({ storage })
//發文
app.post('/posts', authenticate, upload.single('postImg'), (req, res) => {
  var pathRegexp = new RegExp("\/.*");
  var postTitle = req.body.postTitle
  var postImgPath = `/public/postImg/${req.file.filename}`
  var userNickname = req.user.userNickname
  var userImg = req.user.userImg
  var dateNow = new Date();
  console.log(dateNow);
  var post = new Post({
    _created: req.user._id,
    postTitle,
    postImg: postImgPath,
    userNickname,
    userImg,
    _creatDate: dateNow
  });
  post.save().then((post) => {
    res.send(post);
  }).catch((e) => {
    res.status(400).send(e);
  })
});
//拿全部文章
app.get('/getAllPosts', authenticate, (req, res) => {
  Post.find().sort({'_id': -1}).then(posts => {
    res.send(posts)
  }).catch(e => {
    res.status(400).send(e)
  })
});
//發送留言
app.post('/sendMessage', authenticate, (req, res) => {
  var _id = req.body._id;
  var email = req.user.email;
  var userNickname = req.user.userNickname
  var message = req.body.message;
  var userImg = req.user.userImg;
  var _sendDate = new Date();
  Post.findOne({_id}).then((post) => {
    return post.sendMessage({email,userNickname,message,userImg,_sendDate});
  }).then((post) => {
    res.send(post);
  }).catch((e) => {
    res.status(400).send(e)
  })

});
//我的貼文
app.get('/myPosts', authenticate, (req, res) => {
  var _created = req.user._id;
  Post.find({_created}).sort({'_id': -1}).then(data => {
    res.send(data)
  }).catch((e) => {
    res.status(400).send(e)
  })
})

//註冊會員
app.post('/users', upload.single('userImg'), (req, res) => {
  var userData = JSON.parse(req.body.userData)
  console.log(req.file);
  var body = _.pick(userData, ['email', 'password','userNickname']);
  var pathRegexp = new RegExp("\/.*");
  var userImgPath = `/public/userImg/${req.file.filename}`
  body.userImg = userImgPath
  var user = new User(body);
  //User.findByToken
  //User.generateAuthToken
  user.save().then(() => {
    return user.generateAuthToken();
    // res.send(user);
  }).then((token)=>{
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    // console.log(e.errors['password'].message)
    res.status(400).send(e.errors['password'].message);
  })
});

//登入會員
app.post('/user/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  console.log(body);
  User.findByCredentials(body.email, body.password).then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
      }).catch((e) => {
        res.status(400),send();
        // console.log(e)
      });
  });
});
// var authenticate = (req, res, next) => {
//   var token = req.header('x-auth');
//
//   User.findByToken(token).then((user)=>{
//     if(!user){
//       return Promise.reject();
//     }
//       req.user = user;
//       req.token = token;
//       next();
//     }).catch((e)=>{
//     res.status(401).send();
//   });
// }

app.get('/users/me',authenticate, (req,res)=>{
  res.send(req.user);
})
//登出會員
app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }).catch(() => {
    res.status(400).send();
  });
});

app.use(fallback('index.html', { root: __dirname }));

app.listen(8000, function () {
    console.log('listening on port 8000');
});
