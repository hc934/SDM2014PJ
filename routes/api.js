/**
 * route/api.js
 */

var express = require('express');
var router = express.Router();

/* RESTful API */
router.get('/api', function(req, res) {
  res.json({
    "I_am": "JSON_API"
  });
});

router.get('/profile', function(req, res) {

  var sql = 'SELECT * ';
  sql += 'FROM forum_article_info;';

  appPool.getConnection(function(err, connection) {
    connection.query(sql, function(err, rows) {
      if (err) throw err;
      console.log(rows);
      connection.release();
      res.json('index'+ rows);
    });
  });

});

module.exports = router;
