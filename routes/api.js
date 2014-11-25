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

  appPool.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM contact;', function(err, contacts) {
      if (err) throw err;
      connection.query('SELECT * FROM experience;', function(err, experiences) {
        if (err) throw err;
        connection.query('SELECT * FROM education;', function(err, educations) {
          var profile = contacts;
          for (id in profile) {
            profile[id].experience = [];
            profile[id].education = [];
            for (exp_id in experiences) {
              if (id == exp_id) {
                profile[id].experience.push(experiences[exp_id]);
              }
            } // end for
            for (edu_id in educations) {
              if (id == edu_id) {
                profile[id].education.push(educations[edu_id]);
              }
            } // end for
          } // end for
          res.json(profile);
        }); // end last query
      });
    });
  });

});

module.exports = router;
