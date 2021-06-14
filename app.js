var express = require('express');
const { engine } = require('express-edge');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressSession = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles');
var commentsRouter = require('./routes/comments');
var tagsRouter = require('./routes/tags');
var authRouter = require('./routes/auth');
const auth = require('./middleware/auth')
const edge = require("edge.js");

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
    cookie: { maxAge: 3600000 } //60min
}));
// app.use('/', indexRouter);
app.use('*', (req, res, next) => {
    edge.global('auth', req.session.userId)
    next()
},auth.roleAuth);
app.get('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);
app.use('/comments',commentsRouter);
app.use('/tags',tagsRouter);
app.use('/auth',authRouter);
app.use('/userListe',(req,res,next)=>{
    
    res.render('userListe');
});

console.log('started..');
module.exports = app;
