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

router.post('/login', function(req, res) {

  appPool.getConnection(function(err, connection) {
    if (err) throw err;
    var sql = 'SELECT * ';
    sql += 'FROM user_login WHERE user_id="'+req.body.id+'" AND user_password="'+req.body.password+'";';
    connection.query(sql, function(err, account) {
      if (account.length > 0) {
        connection.release();
        // user exist
        res.json({
          "status": true
        });
      } else {
        connection.release();
        res.json({
          "status": false
        });
      }
    });

  })
});

router.post('/profile', function(req, res) {
  appPool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM contact WHERE id="'+req.body.id+'";', function(err, contacts) {
      if (err) throw err;
      connection.query('SELECT * FROM experience;', function(err, experiences) {
        if (err) throw err;
        connection.query('SELECT * FROM education;', function(err, educations) {
          var profile = contacts;
          for (i in profile) {
            profile[i].experience = [];
            profile[i].education = [];
            for (j in experiences) {
              if (profile[i].id == experiences[j].id) {
                profile[i].experience.push(experiences[j]);
              }
            } // end for
            for (k in educations) {
              if (profile[i].id == educations[k].id) {
                profile[i].education.push(educations[k]);
              }
            } // end for
          } // end for
          connection.release();
          res.json(profile);
        }); // end last query
      });
    });
  });

});

router.put('/profile', function(req, res) {
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

router.get('/article/:article_id', function(req, res) {

  console.log(req.params.article_id);
  
  appPool.getConnection(function(err, connection) {
    if (err) throw err;
    var sql = 'SELECT * ';
    sql += 'FROM forum_article_info ';
    sql += 'WHERE article_id="'+req.params.article_id+'"';

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

router.post('/article', function(req, res) {

  console.log(req.body);

  appPool.getConnection(function(err, connection) {
    if (err) throw err;
    var sql = 'INSERT INTO forum_article (user_id, title, content, post_time, edit_time) ';
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

router.post('/:article_id/comment', function(req, res) {
  
  appPool.getConnection(function(err, connection) {
    if (err) throw err;
    var sql = 'INSERT INTO forum_comment (user_id, article_id, content, post_time, edit_time) ';
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

router.delete('/:article_id/comment', function(req, res) {
  
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

// router.get('/example', function(req, res) {
//   appPool.getConnection(function(err, connection) {
//     if (err) throw err;
//     var sql = 'SELECT *';
//     sql += 'FROM forum_article_info';
//     connection.query(sql, function(err, res) {

//     )};
// });

module.exports = router;
