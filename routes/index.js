var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'NTUIM 校友系統' });
});


/* GET profile page. */
router.get('/profile', function(req, res) {
  res.render('profile', { title: 'Express' });
});

router.get('/profile_edit', function(req, res) {
  res.render('profile_edit', { title: 'Express' });
});

router.get('/forum', function(req, res) {
  res.render('forum', { title: 'Express' });
});

router.get('/post', function(req, res) {
  res.render('post', { title: 'Express' });
});

router.get('/articles_001', function(req, res) {
  res.render('articles_001', { title: 'Express' });
});

router.get('/job', function(req, res) {
    res.render('job', { title: 'job' });
});

router.get('/new_job', function(req, res) {
    res.render('new_job', { title: 'new_job' });
});

module.exports = router;
