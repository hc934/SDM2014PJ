var express = require('express');
var router = express.Router();

router.get('/list', function(req, res) {
  appPool.getConnection(function(err, connection) {
    if (err) throw err;
    var sql = 'SELECT * ';
    sql += 'FROM job_content ORDER BY `post_time` DESC';
    connection.query(sql, function(err, jobs) {
      connection.release();
      res.json(jobs);
    });
  });
});

router.post('/new', function(req, res) {
  console.log("before conn");
  appPool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("before send sql");

    var sql = 'INSERT INTO job_content ( stuid, corporation, job_type, location, work_type, payment, characters, work_experience, education, major_in, language_requirement, other_requirement, post_time, edit_time) ';
    sql += 'VALUE("'+req.body.stuid+'","'+req.body.corporation+'","'+req.body.job_type+'","'+req.body.location+'","'+req.body.work_type+'","'+req.body.payment+'","'+req.body.characters+'","'+req.body.work_experience+'","'+req.body.education+'","'+req.body.major_in+'","'+req.body.language_requirement+'","'+req.body.other_requirement+'", NOW(), NOW());';

    console.log(sql);
    connection.query(sql, function(err, result) {
      console.log("before enter if");
      if (err) {
          res.json({"status": false});
          throw err;
          return false;
      }else{
          console.log(result);
          connection.release();
          //res.json(result);
          res.json({"status": true});
          return true;
      }
    });
  });
});

router.get('/info/:job_id', function(req, res) {
  appPool.getConnection(function(err, connection) {
    if (err) throw err;
    var sql = 'SELECT * ';
    sql += 'FROM job_content ';
    sql += 'WHERE job_id='+connection.escape(req.params.job_id)+';';
    connection.query(sql, function(err, show_job) {
      console.log(show_job);
      connection.release();
      res.json(show_job);
    });
  });
});

router.put('/edit', function(req, res) {
  appPool.getConnection(function(err, connection) {
    if (err) throw err;
    var sql = 'UPDATE job_content ';
    sql += 'SET corporation='+connection.escape(req.body.corporation)+', ';
    sql += 'job_type='+connection.escape(req.body.job_type)+', location='+connection.escape(req.body.location)+', ';
    sql += 'work_type='+connection.escape(req.body.work_type)+', payment='+connection.escape(req.body.payment)+', ';
    sql += 'characters='+connection.escape(req.body.characters)+', work_experience='+connection.escape(req.body.work_experience)+', ';
    sql += 'education='+connection.escape(req.body.education)+', major_in='+connection.escape(req.body.major_in)+', ';
    sql += 'language_requirement='+connection.escape(req.body.language_requirement)+', ';
    sql += 'other_requirement='+connection.escape(req.body.other_requirement)+', edit_time=NOW() ';
    sql += 'WHERE job_id='+connection.escape(req.body.job_id);
    console.log(sql);
    connection.query(sql, function(err, result) {
      if (err) {
        console.log(result);
        res.json({"status": false});
        throw err;
        return false;
      }else{
        console.log(result);
        connection.release();
        res.json({"status": true});
        return true;
      }
    });
  });
});

module.exports = router;