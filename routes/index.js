var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
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

module.exports = router;
