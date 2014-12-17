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
      var sql = 'SELECT * FROM user_login WHERE user_id="'+connection.escape(username)+'" AND user_password="'+connection.escape(password)+'"';
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
    sql += 'VALUES("'+connection.escape(id)+'","'+connection.escape(req.body.degree)+'","'+connection.escape(req.body.institute)+'","'+connection.escape(req.body.dept)+'", "'+connection.escape(req.body.startdate)+'", "'+connection.escape(req.body.enddate)+'", "'+connection.escape(req.body.concentration)+'", "'+connection.escape(req.body.obtained)+'");';
    connection.query(sql, function(err, result) {
      if (err) throw err;
      console.log(result);
      connection.release();
      res.json({"status": "true"});
      return

    });

  });

});

// 新增經驗欄位
router.post('/profile/experience', function(req, res) {

  appPool.getConnection(function(err, connection) {
    // var id = req.user[0].user_id;
    var id = 'guest';
    if (err) throw err;

    var sql = 'INSERT INTO experience (stuid, org, dept, position, startdate, enddate, description) ';
    sql += 'VALUES("'+connection.escape(id)+'","'+connection.escape(req.body.org)+'","'+connection.escape(req.body.dept)+'","'+connection.escape(req.body.position)+'", "'+connection.escape(req.body.startdate)+'", "'+connection.escape(req.body.enddate)+'", "'+connection.escape(req.body.description)+'");';
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
    connection.query('SELECT * FROM contact WHERE id="'+ connection.escape(id) +'";', function(err, contacts) {
      if (err) throw err;
      connection.query('SELECT * FROM experience WHERE stuid="'+ connection.escape(id) +'";', function(err, experiences) {
        if (err) throw err;
        connection.query('SELECT * FROM education WHERE stuid="'+ connection.escape(id) +'";', function(err, educations) {
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
    sql += 'SET name="'+connection.escape(req.body.name)+'", email="'+connection.escape(req.body.email)+'", phone_mobile="'+connection.escape(req.body.phone_mobile)+'", phone_work="'+connection.escape(req.body.phone_work)+'", phone_home="'+connection.escape(req.body.phone_home)+'"';
    sql += ' WHERE id="'+connection.escape(req.body.id)+'"';
    connection.query(sql, function(err, res) {
      if (err) throw err;
      console.log(res);

      var sql2 = 'UPDATE education ';
      sql2 += 'SET degree="'+connection.escape(req.body.education[0].degree)+'", institute="'+connection.escape(req.body.education[0].institute)+'", dept="'+connection.escape(req.body.education[0].dept)+'", startdate="'+connection.escape(req.body.education[0].startdate)+'", enddate="'+connection.escape(req.body.education[0].enddate)+'", concentration="'+connection.escape(req.body.education[0].concentration)+'", obtained="'+connection.escape(req.body.education[0].obtained)+'"';
      sql2 += ' WHERE id="'+connection.escape(req.body.id)+'"';
      connection.query(sql2, function(err, res) {
        if (err) throw err;
        console.log(res);

        var sql3 = 'UPDATE experience '; 
        sql3 += 'SET org="'+connection.escape(req.body.experience[0].org)+'", dept="'+connection.escape(req.body.experience[0].dept)+'", position="'+connection.escape(req.body.experience[0].position)+'", startdate="'+connection.escape(req.body.experience[0].startdate)+'", enddate="'+connection.escape(req.body.experience[0].enddate)+'", description="'+connection.escape(req.body.experience[0].description)+'"';
        sql3 += ' WHERE id="'+connection.escape(req.body.id)+'"';
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
    sql += 'SET degree="'+connection.escape(req.body.degree)+'", institute="'+connection.escape(req.body.institute)+'", dept="'+connection.escape(req.body.dept)+'", startdate="'+connection.escape(req.body.startdate)+'", enddate="'+connection.escape(req.body.enddate)+'", concentration="'+connection.escape(req.body.concentration)+'", obtained="'+connection.escape(req.body.obtained)+'"';
    sql += ' WHERE stuid="'+ connection.escape(id) +'"';
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
    sql += ' WHERE title LIKE \'%'+connection.escape(req.params.keyword)+'%\' OR content LIKE \'%'+connection.escape(req.params.keyword)+'%\';';
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
    sql += 'WHERE article_id=\''+connection.escape(req.params.article_id)+'\';';

    connection.query(sql, function(err, article) {
      
      var returnData = article[0];
      returnData.comment = [];

      var sql2 = 'SELECT * ';
      sql2 += 'FROM forum_comment_info ';
      sql2 += 'WHERE article_id="'+connection.escape(req.params.article_id)+'"';
      
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
    var sql = 'UPDATE forum_article SET article_id ='+connection.escape(req.body.article_id)+', title = '+connection.escape(req.body.title)+', content='+connection.escape(req.body.content)+', edit_time = NOW();'
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
    var sql = 'DELETE FROM forum_article WHERE article_id ='+connection.escape(req.body.article_id)+';'
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
    sql += 'VALUE("'+connection.escape(req.body.id)+'","'+connection.escape(req.body.title)+'","'+connection.escape(req.body.content)+'",NOW(),NOW());';
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
    sql += 'VALUE("'+connection.escape(req.body.id)+'","'+connection.escape(req.params.article_id)+'","'+connection.escape(req.body.content)+'",NOW(),NOW());';
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
    sql += 'WHERE user_id="'+connection.escape(user_id)+'" AND article_id="'+connection.escape(req.params.article_id)+'";';
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
    var sql = 'SELECT * FROM forum_like WHERE user_id ="' + connection.escape(req.user[0].user_id) + '" AND article_id = "' + connection.escape(req.params.article_id) + '";';

    connection.query(sql, function(err, result) {
      if (err) throw err;
      console.log('in the first query\n');

      // user already like the article
      console.log(result.length);
      if (result.length > 0) {
        var sql2 = 'DELETE FROM forum_like WHERE user_id ="' + connection.escape(req.user[0].user_id) + '" AND article_id = "' + connection.escape(req.params.article_id) + '";';
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
        sql2 += 'VALUES ("' + connection.escape(req.user[0].user_id) + '","' + connection.escape(req.params.article_id) + '");';
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

router.post('/:article_id/checklike', function(req, res) {
  
  appPool.getConnection(function(err, connection) {
    var id = 'guest';
    // var id = req.user[0].user_id
    if (err) throw err;
    // find and replace
    var sql = 'SELECT * FROM forum_like WHERE user_id ="' + connection.escape(id) + '" AND article_id = "' + connection.escape(req.params.article_id) + '";';

    connection.query(sql, function(err, result) {
      if (err) throw err;
      if (result.length > 0) {
        // result有值，代表user 已經like過這篇文章
        connection.release();
        res.json({"status": "true"});
        return
      } else {
        // user 沒有like過這篇文章
        connection.release();
        res.json({"status": "false"});
        return
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
    sql += 'VALUE("'+connection.escape(req.body.id)+'","'+connection.escape(req.body.corporation)+'","'+connection.escape(req.body.job_type)+'","'+connection.escape(req.body.location)+'","'+connection.escape(req.body.work_type)+'","'+connection.escape(req.body.payment)+'","'+connection.escape(req.body.characters)+'","'+connection.escape(req.body.work_experience)+'","'+connection.escape(req.body.education)+'","'+connection.escape(req.body.major_in)+'","'+connection.escape(req.body.language_requirement)+'","'+connection.escape(req.body.other_requirement)+'");';
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
    sql += 'WHERE id="'+connection.escape(req.params.job_id)+'";';
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
