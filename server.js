const _ = require('lodash');
const fallback = require('express-history-api-fallback');
const express = require('express');
const bodyParser = require('body-parser');
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
//跨站無限制
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.post('/posts', (req, res) => {
  var body = _.pick(req.body, ['user','userImg', 'postTitle', 'postImg']);
  var post = new Post(body);
  console.log(post)
  post.save().then((post) => {
    res.send(post);
  }).catch((e) => {
    res.status(400).send(e);
  })
});
// POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password','userNickname']);
  var user = new User(body);
  //User.findByToken
  //User.generateAuthToken
  user.save().then(() => {
    return user.generateAuthToken();
    // res.send(user);
  }).then((token)=>{
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});
app.post('/user/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  console.log(body);
  User.findByCredentials(body.email, body.password).then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
      }).catch((e) => {
        res.status(400),send();
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
