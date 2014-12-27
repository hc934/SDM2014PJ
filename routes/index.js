var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res) {
  res.render('index', { title: 'NTUIM 校友系統' });
});

router.get('/login', function(req, res) {
  res.render('login', { title: 'NTUIM 校友系統' });
});



/* GET profile relative page. */
router.get('/profile', ensureAuthenticated, function(req, res) {
  res.render('profile/profile', { title: 'NTUIM 校友系統', _user: req.user[0].user_id });
});

router.get('/profile/:profile_id', ensureAuthenticated, function(req, res) {
  res.render('profile/profile', { title: 'NTUIM 校友系統', _user: null });
});

router.get('/profile/edit', ensureAuthenticated, function(req, res) {
  res.render('profile/profile_edit', { title: 'NTUIM 校友系統' });
});



/* GET article relative page. */
router.get('/post', ensureAuthenticated, function(req, res) {
  res.render('article/post', { title: 'NTUIM 校友系統' });
});

router.get('/edit/:article_id', ensureAuthenticated, function(req,res){
	res.render('article/edit', { title :'NTUIM 校友系統' });
});

router.get('/article/:article_id', ensureAuthenticated, function(req, res) {
  res.render('article/single_article', { title :'NTUIM 校友系統' });
});


/* GET job relative page. */
router.get('/job', ensureAuthenticated, function(req, res) {
    res.render('job/list', { title: 'NTUIM 校友系統' });
});

router.get('/job/new', ensureAuthenticated, function(req, res) {
    res.render('job/new', { title: 'NTUIM 校友系統' });
});

router.get('/job/info', ensureAuthenticated, function(req, res) {
    res.render('job/info', { title: 'new_job' });
});

router.get('/job/info/:job_id', ensureAuthenticated, function(req, res) {
  res.render('job/info', { title: 'new_job' });
});


router.get('/job/:search_requirement', ensureAuthenticated, function(req, res) {
    res.render('job/search', { title: 'NTUIM 校友系統' });
});


function ensureAuthenticated(req, res, next) {
  console.log(req.user);
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

module.exports = router;
