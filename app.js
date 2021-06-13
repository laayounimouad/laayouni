var express = require('express');
const { engine } = require('express-edge');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressSession = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles');
var commentsRouter = require('./routes/comments');
var tagsRouter = require('./routes/tags');
var authRouter = require('./routes/auth');

const edge = require("edge.js");
//var publicRouter = require('./routes/public');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static( 'public'));

app.use(engine);
app.set('views', __dirname + '/views');
app.use(expressSession({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600 }
}));
// app.use('/', indexRouter);
app.use('*', (req, res, next) => {
    edge.global('auth', req.session.userId)
    next()
});
app.get('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);
app.use('/comments',commentsRouter);
app.use('/tags',tagsRouter);
app.use('/auth',authRouter);

//app.use('/public',publicRouter);
console.log('started..');
module.exports = app;
