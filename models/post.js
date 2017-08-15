var mongoose = require('mongoose');

var Post = mongoose.model('Post', {
  userImg: {
    type: String,
    trim: true,
    required: true
  },
  user:{
    type: String,
    trim: true,
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
      user: { type: String, default: null }
    },
    {
      message: { type: String, default: null }
    },
    {
      date: { type: Date, default: null }
  }]
});

module.exports = {Post};
