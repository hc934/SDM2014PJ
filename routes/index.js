var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'NTUIM 校友系統' });
});

router.get('/login', function(req, res) {
  res.render('index', { title: 'NTUIM 校友系統' });
});


/* GET profile page. */

router.get('/profile', ensureAuthenticated, function(req, res) {
  //console.log(req.user.id);
  //console.log(req.user);
  res.render('profile', { title: 'NTUIM 校友系統', _user: req.user[0].user_id });
});

router.get('/profile/:profile_id', function(req, res) {
  res.render('profile', { title: 'NTUIM 校友系統', _user: null });
});

router.get('/profile/edit', function(req, res) {
  res.render('profile_edit', { title: 'NTUIM 校友系統' });
});



router.get('/forum', ensureAuthenticated, function(req, res) {
  res.render('forum', { title: 'NTUIM 校友系統' });
});

router.get('/post', ensureAuthenticated, function(req, res) {
  res.render('post', { title: 'NTUIM 校友系統' });
});

router.get('/edit/:article_id', ensureAuthenticated, function(req,res){
	res.render('edit',{title :'NTUIM 校友系統'});
});

router.get('/articles_001', function(req, res) {
  res.render('articles_001', { title: 'NTUIM 校友系統' });
});

router.get('/job', function(req, res) {
    res.render('job', { title: 'NTUIM 校友系統' });
});

router.get('/new_job', ensureAuthenticated, function(req, res) {
    res.render('new_job', { title: 'NTUIM 校友系統' });
});

/*router.get('/show_job', function(req, res) {
    res.render('job/single_job', { title: 'new_job' });
});*/

function ensureAuthenticated(req, res, next) {
  console.log(req.user);
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

module.exports = router;
