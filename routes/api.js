/**
 * route/api.js
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/* RESTful API */
router.get('/api', function(req, res) {
  res.json({
    "I_am": "JSON_API"
  });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.json({
      "status": true
    });
});

// Strategies
passport.use(new LocalStrategy(
  function(username, password, done) {
    var _user = {};
    appPool.getConnection(function(err, connection) {
      if (err) throw err;
      var sql = 'SELECT * FROM user_login WHERE user_id="'+username+'" AND user_password="'+password+'"';
      connection.query(sql, function(err, user) {
        if (err) { return done(err); }
        return done(null, user);
      });
    });
  }
));

// serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// 新增教育欄位
router.post('/profile/education', apiEnsureAuthenticated, function(req, res) {

  appPool.getConnection(function(err, connection) {
    var id = req.user[0].user_id;
    if (err) throw err;

    var sql = 'INSERT INTO education (stuid, degree, institute, dept, startdate, enddate, concentration, obtained) ';
    sql += 'VALUES("'+id+'","'+req.body.degree+'","'+req.body.institute+'","'+req.body.dept+'", "'+req.body.startdate+'", "'+req.body.enddate+'", "'+req.body.concentration+'", "'+req.body.obtained+'");';
    connection.query(sql, function(err, result) {
      if (err) throw err;
      console.log(result);
      connection.release();
      res.json({"status": "true"});
      return

    });

  });

});

// public api
router.post('/profile/:profile_id', function(req, res) {
  id = req.params.profile_id;

  appPool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM contact WHERE id="'+ id +'";', function(err, contacts) {
      if (err) throw err;
      connection.query('SELECT * FROM experience WHERE stuid="'+ id +'";', function(err, experiences) {
        if (err) throw err;
        connection.query('SELECT * FROM education WHERE stuid="'+ id +'";', function(err, educations) {
          console.log("educations");
          console.log(educations);

          console.log("experiences");
          console.log(experiences);

          console.log("contacts");
          console.log(contacts);
          var profile = contacts;
          for (i in profile) {
            profile[i].experience = [];
            profile[i].education = [];
            for (j in experiences) {
              if (profile[i].id == experiences[j].stuid) {
                profile[i].experience.push(experiences[j]);
              }
            } // end for
            for (k in educations) {
              if (profile[i].id == educations[k].stuid) {
                profile[i].education.push(educations[k]);
              }
            } // end for
          } // end for
          connection.release();
          res.json(profile[0]);
        }); // end last query
      });
    });
  });

});

router.put('/profile', apiEnsureAuthenticated, function(req, res) {
  // req.body
  
  appPool.getConnection(function(err, connection) {
    if (err) throw err;
    var sql = 'UPDATE contact ';
    sql += 'SET name="'+req.body.name+'", email="'+req.body.email+'", phone_mobile="'+req.body.phone_mobile+'", phone_work="'+req.body.phone_work+'", phone_home="'+req.body.phone_home+'"';
    sql += ' WHERE id="'+req.body.id+'"';
    connection.query(sql, function(err, res) {
      if (err) throw err;
      console.log(res);

      var sql2 = 'UPDATE education ';
      sql2 += 'SET degree="'+req.body.education[0].degree+'", institute="'+req.body.education[0].institute+'", dept="'+req.body.education[0].dept+'", startdate="'+req.body.education[0].startdate+'", enddate="'+req.body.education[0].enddate+'", concentration="'+req.body.education[0].concentration+'", obtained="'+req.body.education[0].obtained+'"';
      sql2 += ' WHERE id="'+req.body.id+'"';
      connection.query(sql2, function(err, res) {
        if (err) throw err;
        console.log(res);

        var sql3 = 'UPDATE experience '; 
        sql3 += 'SET org="'+req.body.experience[0].org+'", dept="'+req.body.experience[0].dept+'", position="'+req.body.experience[0].position+'", startdate="'+req.body.experience[0].startdate+'", enddate="'+req.body.experience[0].enddate+'", description="'+req.body.experience[0].description+'"';
        sql3 += ' WHERE id="'+req.body.id+'"';
        connection.query(sql3, function(err, res) {
          if (err) throw err;
          console.log(res);
          connection.release();
          return true;
        });

      });

    });

  });
});

// 修改欄位
router.put('/profile/education', function(req, res) {

  appPool.getConnection(function(err, connection) {
    var id = 'guest';
    // req.user[0].user_id
    if (err) throw err;

    var sql = 'UPDATE education ';
    sql += 'SET degree="'+req.body.degree+'", institute="'+req.body.institute+'", dept="'+req.body.dept+'", startdate="'+req.body.startdate+'", enddate="'+req.body.enddate+'", concentration="'+req.body.concentration+'", obtained="'+req.body.obtained+'"';
    sql += ' WHERE stuid="'+ id +'"';
    connection.query(sql, function(err, result) {
      if (err) throw err;
      console.log(result);
      connection.release();
      res.json({"status": "true"});
      return

    });

  });

});



router.get('/articles', function(req, res) {
  appPool.getConnection(function(err, connection) {
    if (err) throw err;
    var sql = 'SELECT * ';
    sql += 'FROM forum_article_info';
    connection.query(sql, function(err, articles) {
      // console.log(articles);
      connection.release();
      res.json(articles);
    });
  });
});

router.get('/search/:keyword', function(req, res) {

  console.log("hello");
  appPool.getConnection(function(err, connection) {
    if (err) throw err;
    var sql = 'SELECT * FROM forum_article_info';
    sql += ' WHERE title LIKE \'%'+req.params.keyword+'%\' OR content LIKE \'%'+req.params.keyword+'%\';';
    connection.query(sql, function(err, articles) {
      // console.log(articles);
      connection.release();
      res.json(articles);
    });
  });
});

router.get('/article/:article_id', function(req, res) {
  console.log(req.params.article_id);
  
  appPool.getConnection(function(err, connection) {
    if (err) throw err;
    var sql = 'SELECT * ';
    sql += 'FROM forum_article_info ';
    sql += 'WHERE article_id=\''+req.params.article_id+'\';';

    connection.query(sql, function(err, article) {
      
      var returnData = article[0];
      returnData.comment = [];

      var sql2 = 'SELECT * ';
      sql2 += 'FROM forum_comment_info ';
      sql2 += 'WHERE article_id="'+req.params.article_id+'"';
      
      connection.query(sql2, function(err, comments) {
        for (i in comments) {
          returnData.comment.push(comments[i]);
        }
        console.log(returnData);
        connection.release();
        res.json(returnData);
      });

    });

  });
});

router.put('/article', apiEnsureAuthenticated, function(req, res) {
  console.log(req.body);
  appPool.getConnection(function(err, connection) {
    if (err) throw err;
    var sql = 'UPDATE forum_article SET article_id ='+req.body.article_id+', title = '+req.body.title+', content='+req.body.content+', edit_time = NOW();'
    connection.query(sql, function(err, result) {
      if (err) throw err;
      console.log(result);
      connection.release();
      res.json(result);
      return true;
    });
  });
});

router.delete('/article', apiEnsureAuthenticated, function(req, res) {
  console.log(req.body);
  appPool.getConnection(function(err, connection) {
    if (err) throw err;
    var sql = 'DELETE FROM forum_article WHERE article_id ='+req.body.article_id+';'
    connection.query(sql, function(err, result) {
      if (err) throw err;
      console.log(result);
      connection.release();
      res.json(result);
      return true;
    });
  });
});

router.post('/article', apiEnsureAuthenticated, function(req, res) {

  console.log(req.body);

  appPool.getConnection(function(err, connection) {
    if (err) throw err;
    var sql = 'INSERT INTO forum_article (user_id, title, content, post_time, edit.time) ';
    sql += 'VALUE("'+req.body.id+'","'+req.body.title+'","'+req.body.content+'",NOW(),NOW());';
    connection.query(sql, function(err, result) {
      if (err) throw err;
      console.log(result);
      connection.release();
      res.json(result);
      return true;
    });
  });
});

router.post('/:article_id/comment', apiEnsureAuthenticated, function(req, res) {
  
  appPool.getConnection(function(err, connection) {
    if (err) throw err;
    var sql = 'INSERT INTO forum_comment (user_id, article_id, content, post_time, edit.time) ';
    sql += 'VALUE("'+req.body.id+'","'+req.params.article_id+'","'+req.body.content+'",NOW(),NOW());';
    connection.query(sql, function(err, result) {
      if (err) throw err;
      console.log(result);
      connection.release();
      res.json(result);
      return true;
    });
  });
});

router.delete('/:article_id/comment', apiEnsureAuthenticated, function(req, res) {
  
  appPool.getConnection(function(err, connection) {
    if (err) throw err;
    var user_id = 'b00705033';
    var sql = 'DELETE FROM forum_comment ';
    sql += 'WHERE user_id="'+user_id+'" AND article_id="'+req.params.article_id+'";';
    connection.query(sql, function(err, result) {
      if (err) throw err;
      console.log(result);
      connection.release();
      res.json(result);
      return true;
    });
  });
});

router.post('/:article_id/like', apiEnsureAuthenticated, function(req, res) {
  
  appPool.getConnection(function(err, connection) {
    
    if (err) throw err;
    // find and replace
    var sql = 'SELECT * FROM forum_like WHERE user_id ="' + req.user[0].user_id + '" AND article_id = "' + req.params.article_id + '";';

    connection.query(sql, function(err, result) {
      if (err) throw err;
      console.log('in the first query\n');

      // user already like the article
      console.log(result.length);
      if (result.length > 0) {
        var sql2 = 'DELETE FROM forum_like WHERE user_id ="' + req.user[0].user_id + '" AND article_id = "' + req.params.article_id + '";';
        connection.query(sql2, function(err, result) {
          if (err) throw err;
          console.log(result);
          connection.release();
          res.json({"status": "remove one like to article"});
          return true;
        });
      } else {
        // user had not liked the article
        var sql2 = 'INSERT INTO forum_like (user_id, article_id) ';
        sql2 += 'VALUES ("' + req.user[0].user_id + '","' + req.params.article_id + '");';
        connection.query(sql2, function(err, result) {
          if (err) throw err;
          console.log(result);
          connection.release();
          res.json({"status": "add one like to article"});
          return true;
        });
      }
    });

  });

});


router.get('/jobs', function(req, res) {
  appPool.getConnection(function(err, connection) {
    if (err) throw err;
    var sql = 'SELECT * ';
    sql += 'FROM job_content';
    connection.query(sql, function(err, jobs) {
      connection.release();
      res.json(jobs);
    });
  });
});

router.post('/new_jobs', apiEnsureAuthenticated, function(req, res) {
  // req.body
  console.log("before conn");
  appPool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("before send sql");
    var sql = 'INSERT INTO job_content ( student_id, corporation, job_type, location, work_type, payment, characters, work_experience, education, major_in, language_requirement, other_requirement) ';
    sql += 'VALUE("'+req.body.id+'","'+req.body.corporation+'","'+req.body.job_type+'","'+req.body.location+'","'+req.body.work_type+'","'+req.body.payment+'","'+req.body.characters+'","'+req.body.work_experience+'","'+req.body.education+'","'+req.body.major_in+'","'+req.body.language_requirement+'","'+req.body.other_requirement+'");';
    console.log(sql);
    connection.query(sql, function(err, result) {
      console.log("before enter if");
      if (err) throw err;
      console.log(result);
      connection.release();
      res.json(result);
      return true;
    });
  });
});

router.post('/setLocale/:language', function(req, res) {
  var locale;
  if (req.params.language == 'English') {
    locale = 'en';
  } else if (req.params.language == 'Chinese') {
    locale = 'zh_TW';
  }
  // console.log(locale);
  res.setLocale(locale);
  return true;
});


/*api for show_job*/
router.get('/show_job/:job_id', function(req, res) {
  appPool.getConnection(function(err, connection) {
    if (err) throw err;
    var sql = 'SELECT * ';
    sql += 'FROM job_content ';
    sql += 'WHERE id="'+req.params.job_id+'";';
    connection.query(sql, function(err, show_job) {
      //console.log(sql);
      connection.release();
      res.json(show_job);
    });
  });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

function apiEnsureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.status(400);
  res.json({
    "status": 400,
    "message": "Not Authenticated"
  });
  return;
}

module.exports = router;
