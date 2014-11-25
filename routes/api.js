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
  var profile_id = "b00705028";
  appPool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM contact WHERE id="'+profile_id+'";', function(err, contacts) {
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
      res.json(articles);
    });
  });
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
