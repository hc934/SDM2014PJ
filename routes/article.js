var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:article_id', function(req, res) {
  console.log(req.article_id);
  res.render('article/single_article');
});

module.exports = router;