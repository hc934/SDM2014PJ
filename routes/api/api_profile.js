/**
 * routes/api/profile.js
 */

var express = require('express');
var router = express.Router();

// 新增 profile 教育欄位
router.post('/education', function(req, res) {

  appPool.getConnection(function(err, connection) {
    var id = req.user[0].user_id;
    if (err) throw err;

    var sql = 'INSERT INTO education (stuid, degree, institute, dept, startdate, enddate, concentration, obtained) ';
    sql += 'VALUES('+connection.escape(id)+','+connection.escape(req.body.degree)+','+connection.escape(req.body.institute)+','+connection.escape(req.body.dept)+', '+connection.escape(req.body.startdate)+', '+connection.escape(req.body.enddate)+', '+connection.escape(req.body.concentration)+', '+connection.escape(req.body.obtained)+');';
    connection.query(sql, function(err, result) {
      if (err) throw err;
      console.log(result);
      connection.release();
      res.json({"status": "true"});
      return

    });

  });

});

// 修改 profile 教育欄位
router.put('/education', function(req, res) {

  appPool.getConnection(function(err, connection) {
    var id = 'guest';
    // req.user[0].user_id
    if (err) throw err;

    var sql = 'UPDATE education ';
    sql += 'SET degree='+connection.escape(req.body.degree)+', institute='+connection.escape(req.body.institute)+', dept='+connection.escape(req.body.dept)+', startdate='+connection.escape(req.body.startdate)+', enddate='+connection.escape(req.body.enddate)+', concentration='+connection.escape(req.body.concentration)+', obtained='+connection.escape(req.body.obtained)+'';
    sql += ' WHERE stuid='+ connection.escape(id) +'';
    connection.query(sql, function(err, result) {
      if (err) throw err;
      console.log(result);
      connection.release();
      res.json({"status": "true"});
      return

    });

  });

});

// 新增 profile 經驗欄位
router.post('/experience', function(req, res) {

  appPool.getConnection(function(err, connection) {
    // var id = req.user[0].user_id;
    var id = 'guest';
    if (err) throw err;

    var sql = 'INSERT INTO experience (stuid, org, dept, position, startdate, enddate, description) ';
    sql += 'VALUES('+connection.escape(id)+','+connection.escape(req.body.org)+','+connection.escape(req.body.dept)+','+connection.escape(req.body.position)+', '+connection.escape(req.body.startdate)+', '+connection.escape(req.body.enddate)+', '+connection.escape(req.body.description)+');';
    connection.query(sql, function(err, result) {
      if (err) throw err;
      console.log(result);
      connection.release();
      res.json({"status": "true"});
      return

    });

  });

});

router.post('/:profile_id', function(req, res) {
  id = req.params.profile_id;

  appPool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM contact WHERE id='+ connection.escape(id) +';', function(err, contacts) {
      if (err) throw err;
      connection.query('SELECT * FROM experience WHERE stuid='+ connection.escape(id) +';', function(err, experiences) {
        if (err) throw err;
        connection.query('SELECT * FROM education WHERE stuid='+ connection.escape(id) +';', function(err, educations) {
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

router.put('/', function(req, res) {
    // req.body

    appPool.getConnection(function(err, connection) {
        if (err) throw err;

        var sql = 'UPDATE contact ';
        sql += 'SET name='+connection.escape(req.body.name)+', email='+connection.escape(req.body.email)+', phone_mobile='+connection.escape(req.body.phone_mobile)+', phone_work='+connection.escape(req.body.phone_work)+', phone_home='+connection.escape(req.body.phone_home)+'';
        sql += ' WHERE id='+connection.escape(req.body.id)+';';

        connection.query(sql, function(err, res) {
            if (err) throw err;
            console.log(res);
        });

        for(var i = 0; i < req.body.education.length; i++){
            var sql2 = 'UPDATE education ';
            sql2 += 'SET degree='+connection.escape(req.body.education[i].degree)+', institute='+connection.escape(req.body.education[i].institute)+', dept='+connection.escape(req.body.education[i].dept)+', startdate='+connection.escape(req.body.education[i].startdate)+', enddate='+connection.escape(req.body.education[i].enddate)+', concentration='+connection.escape(req.body.education[i].concentration)+', obtained='+connection.escape(req.body.education[i].obtained)+'';
            sql2 += ' WHERE id='+connection.escape(req.body.education[i].id)+'; ';
            connection.query(sql2, function(err, res) {
                if (err) throw err;
                console.log(res);
            });
        }

        for(var i = 0; i < req.body.experience.length; i++){
            var sql3 = 'UPDATE experience ';
            sql3 += 'SET org='+connection.escape(req.body.experience[i].org)+', dept='+connection.escape(req.body.experience[i].dept)+', position='+connection.escape(req.body.experience[i].position)+', startdate='+connection.escape(req.body.experience[i].startdate)+', enddate='+connection.escape(req.body.experience[i].enddate)+', description='+connection.escape(req.body.experience[i].description)+'';
            sql3 += ' WHERE id='+connection.escape(req.body.experience[i].id)+ '; ';
            connection.query(sql3, function(err, res) {
                if (err) throw err;
                console.log(res);
            });
        }



        connection.release();
        return true;

    });
});

//router.put('/profile', apiEnsureAuthenticated, function(req, res) {
//  // req.body
//
//  appPool.getConnection(function(err, connection) {
//    if (err) throw err;
//
//    var sql = 'UPDATE contact ';
//    sql += 'SET name='+connection.escape(req.body.name)+', email='+connection.escape(req.body.email)+', phone_mobile='+connection.escape(req.body.phone_mobile)+', phone_work='+connection.escape(req.body.phone_work)+', phone_home='+connection.escape(req.body.phone_home)+'';
//    sql += ' WHERE id='+connection.escape(req.body.id)+';';
//
//    connection.query(sql, function(err, res) {
//      if (err) throw err;
//      console.log(res);
//
//      var sql2 = "";
//      for(var i = 0; i < req.body.education.length; i++){
//          sql2 += 'UPDATE education ';
//          sql2 += 'SET degree='+connection.escape(req.body.education[i].degree)+', institute='+connection.escape(req.body.education[i].institute)+', dept='+connection.escape(req.body.education[i].dept)+', startdate='+connection.escape(req.body.education[i].startdate)+', enddate='+connection.escape(req.body.education[i].enddate)+', concentration='+connection.escape(req.body.education[i].concentration)+', obtained='+connection.escape(req.body.education[i].obtained)+'';
//          sql2 += ' WHERE id='+connection.escape(req.body.education[i].id)+'; ';
//      }
//
//      connection.query(sql2, function(err, res) {
//        if (err) throw err;
//        //console.log(res);
//
//        console.log(req.body.experience);
//        var sql3 = "";
//        for(var i = 0; i < req.body.experience.length; i++){
//            sql3 += 'UPDATE experience ';
//            sql3 += 'SET org='+connection.escape(req.body.experience[i].org)+', dept='+connection.escape(req.body.experience[i].dept)+', position='+connection.escape(req.body.experience[i].position)+', startdate='+connection.escape(req.body.experience[i].startdate)+', enddate='+connection.escape(req.body.experience[i].enddate)+', description='+connection.escape(req.body.experience[i].description)+'';
//            sql3 += ' WHERE id='+connection.escape(req.body.experience[i].id)+ '; ';
//            console.log("sql = " + sql3);
//        }
//
//        console.log("sql = " + sql3);
//        connection.query(sql3, function(err, res) {
//          if (err) throw err;
//          console.log(res);
//          connection.release();
//          return true;
//        });
//
//      });
//
//    });
//
//  });
//});






module.exports = router;
