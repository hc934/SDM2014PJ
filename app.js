var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require('./config/config');
var mysql = require('mysql');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var api = require('./routes/api');

var app = express();

var i18n = require('i18n');
i18n.configure({
    locales:['en', 'zh_TW'],
    directory: __dirname + '/locales',
    defaultLocale: "zh_TW",
    cookie: "sdm2014fall"
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'sdm2014fall-group3',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n.init);

// database
appPool = mysql.createPool({
    host : config.db_host,
    port : config.db_port,
    user : config.db_username,
    password : config.db_password,
    database : config.db_name,
    connectionLimit : 10
});

app.use('/', routes);
app.use('/api', api);

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

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

function apiEnsureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.status(400);
  res.json({
    "status": 400,
    "message": "Not Authenticated"
  });
  return;
}

module.exports = app;
