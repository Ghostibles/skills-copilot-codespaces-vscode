//create web server
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Comment = require('./models/comment');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments');
const db = mongoose.connection;

db.once('open', function(){
  console.log('Connected to MongoDB');
});

db.on('error', function(err){
  console.log(err);
});
//set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//set body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//set public folder
app.use(express.static(path.join(__dirname, 'public')));
//set routes
app.get('/', function(req, res){
  Comment.find({}, function(err, comments){
    if (err) {
      console.log(err);
    }
    else {
      res.render('index', {
        title: 'Comments',
        comments: comments
      });
    }
  });
});

app.get('/comments/add', function(req, res){
  res.render('add_comment', {
    title: 'Add comment'
  });
});

app.post('/comments/add', function(req, res){
  let comment = new Comment();
  comment.author = req.body.author;
  comment.text = req.body.text;
  comment.save(function(err){
    if (err) {
      console.log(err);
    }
    else {
      res.redirect('/');
    }
  });
});

app.get('/comments/edit/:id', function(req, res){
  Comment.findById(req.params.id, function(err, comment){
    if (err) {
      console.log(err);
    }
    else {
      res.render('edit_comment', {
        title: 'Edit comment',
        comment: comment
      });
    }
  });
});

app.post('/comments/edit/:id', function(req, res){
  let comment = {};
  comment.author = req.body.author;
  comment.text = req.body.text;
  let query = {_id: req.params.id};
  Comment.update(query, comment, function(err){
    if (err) {
      console.log(err);
    }
    else {
      res.redirect('/');
    }
  });
});

app.delete('/comments/:id', function(req, res){
  let query = {_id: req.params.id};
  Comment.remove(query, function(err){
    if (err) {
      console.log(err);