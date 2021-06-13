var express = require('express');
const { config, engine } = require('express-edge');
const fetch = require("node-fetch");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles');
var commentsRouter = require('./routes/comments');
var tagsRouter = require('./routes/tags');
var authRouter = require('./routes/auth')
//var publicRouter = require('./routes/public');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static( 'public'));

app.use(engine);
app.set('views', __dirname + '/views');

// app.use('/', indexRouter);
app.get('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);
app.use('/comments',commentsRouter);
app.use('/tags',tagsRouter);
app.use('/auth',authRouter);
app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/about.html'));
});
app.get('/post', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/post.html'));
});
app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/contact.html'));
});

//app.use('/public',publicRouter);
console.log('started..');
module.exports = app;
