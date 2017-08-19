var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  _created:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  postTitle: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  postImg: {
    type: String,
    trim: true,
    default: null
  },
  messages: [
    {
      email: { type: String, required: true},
      message: { type: String, required: true },
      userNickname: {type: String, required: true },
      userImg: {type: String, required: true }
    }
  ]
});

PostSchema.methods.sendMessage = function (payload) {
  var post = this;

  post.messages.push(payload);

  return post.save().then(()=>{

    return post
  })
}

var Post = mongoose.model('Post', PostSchema);

module.exports = {Post};
