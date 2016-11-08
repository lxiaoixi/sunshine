var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// for safe
var helmet = require('helmet');

var csurf = require('csurf');


var routes = require('./routes/index');
var users = require('./routes/users');
var article = require('./routes/article');

var expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
// setup route middlewares 
var csrfProtection = csurf({ cookie: true }); //确定账号是否要保存在cookie和session中


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// for safe
app.use(helmet());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//使用cookie
app.use(cookieParser());


app.set('trust proxy', 1); // trust first proxy 将代理服务器前第 n 跳当作客户端
app.use(session({
    name: 'sunshine',
    keys: ['apsdkncuaewp9hvp9q23jb', 'p9hguiw45kbjhvmzxdfnb0vd19cim'],
    cookie: {
        secure: true, //a boolean indicating whether the cookie is only to be sent over HTTPS (false by default for HTTP, true by default for HTTPS).
        httpOnly: true,
        domain: 'tyust.edu.cn',
        expires: expiryDate // cookie 的有效期或者用maxAge属性
    }
}));
app.use(require('express-session')({
    secret: 'alkjsdfpoiunasdfuiklasdfoiucoiuwelk',
    resave: false,
    saveUninitialized: false
}));
//启用passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/article', article);

// passport config
var Account = require('./models/account');
passport.use(Account.createStrategy());
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());



// mongoose

mongoose.connect('mongodb://localhost/sunshine');
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;