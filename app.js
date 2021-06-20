var express = require('express');

var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles');
var commentsRouter = require('./routes/comments');
var tagsRouter = require('./routes/tags');

var cors = require('cors')

var app = express();
var corsOptions = {
    origin: true
}
app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/articles', articlesRouter);
app.use('/comments',commentsRouter);
app.use('/tags',tagsRouter);

console.log('started..');
module.exports = app;
