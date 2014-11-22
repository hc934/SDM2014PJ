var express = require('express');
var router = express.Router();

/* RESTful API */
router.get('/', function(req, res) {
  res.json({
    "I_am": "JSON_API"
  });
});

module.exports = router;
