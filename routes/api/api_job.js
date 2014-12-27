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


/* Search for: 
stuid, user_name, corporation, job_type, location, work_type, 
payment, characters, work_experience, education, major_in, 
language_requirement, finished*/
router.get('/search', function(req, res) {
  appPool.getConnection(function(err, connection) {
    if (err) throw err;

    var query = require('url').parse(req.url,true).query;
    console.log(query);
    if(query.stuid == undefined) query.stuid = '';
    if(query.user_name == undefined) query.user_name = '';
    if(query.corporation == undefined) query.corporation = '';
    if(query.job_type == undefined) query.job_type = '';
    if(query.location == undefined) query.location = '';
    if(query.work_type == undefined) query.work_type = '';
    if(query.payment == undefined) query.payment = '';
    if(query.characters == undefined) query.characters = '';
    if(query.work_experience == undefined) query.work_experience = '';
    if(query.education == undefined) query.education = '';
    if(query.major_in == undefined) query.major_in = '';
    if(query.language_requirement == undefined) query.language_requirement = '';
    if(query.finished == undefined) query.finished = '';

    var sql = 'SELECT * ';
    sql += 'FROM job_content_info '
    sql += 'Where ';
    sql += 'stuid LIKE '+ connection.escape('%'+query.stuid+'%') +' AND ';
    sql += 'user_name LIKE '+ connection.escape('%'+query.user_name+'%') +' AND ';
    sql += 'corporation LIKE '+ connection.escape('%'+query.corporation+'%') +' AND ';
    sql += 'job_type LIKE '+ connection.escape('%'+query.job_type+'%') +' AND ';
    sql += 'location LIKE '+ connection.escape('%'+query.location+'%') +' AND ';
    sql += 'work_type LIKE '+ connection.escape('%'+query.work_type+'%') +' AND ';
    sql += 'payment LIKE '+ connection.escape('%'+query.payment+'%') +' AND ';
    sql += 'characters LIKE '+ connection.escape('%'+query.characters+'%') +' AND ';
    sql += 'work_experience LIKE '+ connection.escape('%'+query.work_experience+'%') +' AND ';
    sql += 'education LIKE '+ connection.escape('%'+query.education+'%') +' AND ';
    sql += 'major_in LIKE '+ connection.escape('%'+query.major_in+'%') +' AND ';
    sql += 'language_requirement LIKE '+ connection.escape('%'+query.language_requirement+'%') +' AND ';
    sql += 'finished LIKE  ' + connection.escape('%'+query.finished+'%') ;
    sql += ' ORDER BY `post_time` DESC ';
    //console.log(sql);
    connection.query(sql, function(err, results) {
      connection.release();
      res.json(results);
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