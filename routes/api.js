/**
 * routes/api.js
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/* Include part of api */
var article = require('./api/api_article');
var profile = require('./api/api_profile');
var job = require('./api/api_job');


router.post('/login', passport.authenticate('local'), function(req, res) {
    res.json({
      "status": true
    });
});

router.get('/articles', apiEnsureAuthenticated, function(req, res) {
  appPool.getConnection(function(err, connection) {
    if (err) throw err;
    var sql = 'SELECT * ';
    sql += 'FROM forum_article_info';
    connection.query(sql, function(err, articles) {
      // console.log(articles);
      connection.release();
      res.json(articles);

    });
  });
});

router.get('/search/:keyword', apiEnsureAuthenticated, function(req, res) {

  console.log("hello");
  appPool.getConnection(function(err, connection) {
    if (err) throw err;
    var sql = 'SELECT * FROM forum_article_info';
    sql += ' WHERE title LIKE '+connection.escape('%'+req.params.keyword+'%')+' OR content LIKE '+connection.escape('%'+req.params.keyword+'%')+';';
    connection.query(sql, function(err, articles) {
      // console.log(articles);
      connection.release();
      res.json(articles);
    });
  });
});

router.post('/setLocale/:language', apiEnsureAuthenticated, function(req, res) {
    var locale;
    if (req.params.language == 'English') {
        locale = 'en';
    } else if (req.params.language == 'Chinese') {
        locale = 'zh_TW';
    }
    // console.log(locale);
    res.setLocale(locale);
    return true;
});

router.use('/profile', apiEnsureAuthenticated, profile);
router.use('/article', apiEnsureAuthenticated, article);
router.use('/', apiEnsureAuthenticated, job);

// Strategies
passport.use(new LocalStrategy(
  function(username, password, done) {
    var _user = {};
    appPool.getConnection(function(err, connection) {
      if (err) throw err;
      var sql = 'SELECT * FROM user_login WHERE user_id='+connection.escape(username)+' AND user_password='+connection.escape(password)+'';
      connection.query(sql, function(err, user) {
        if (err) { return done(err); }
        return done(null, user);
      });
    });
  }
));

// serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
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

module.exports = router;
