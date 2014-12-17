var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:job_id', function(req, res) {
  console.log(req.job_id);
  res.render('job/single_job');
});

module.exports = router;
