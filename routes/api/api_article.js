/**
 * routes/api/article.js
 */

var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {

  console.log(req.body);

  appPool.getConnection(function(err, connection) {
    if (err) throw err;
    var sql = 'INSERT INTO forum_article (user_id, title, content, post_time, edit_time) ';
    sql += 'VALUE('+connection.escape(req.body.id)+','+connection.escape(req.body.title)+','+connection.escape(req.body.content)+',NOW(),NOW());';
    connection.query(sql, function(err, result) {
      if (err) throw err;
      console.log(result);
      connection.release();
      res.json(result);
      return true;
    });
  });
});

router.put('/', function(req, res) {
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

router.delete('/', function(req, res) {
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



router.get('/:article_id', function(req, res) {
  console.log(req.params.article_id);
  
  appPool.getConnection(function(err, connection) {
    if (err) throw err;
    var sql = 'SELECT * ';
    sql += 'FROM forum_article_info ';
    sql += 'WHERE article_id='+connection.escape(req.params.article_id)+';';

    connection.query(sql, function(err, article) {
      
      var returnData = article[0];
      returnData.comment = [];

      var sql2 = 'SELECT * ';
      sql2 += 'FROM forum_comment_info ';
      sql2 += 'WHERE article_id='+connection.escape(req.params.article_id)+';';
      
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



router.post('/:article_id/comment', function(req, res) {
  
  appPool.getConnection(function(err, connection) {
    if (err) throw err;
    var sql = 'INSERT INTO forum_comment (user_id, article_id, content, post_time, edit_time) ';
    sql += 'VALUE('+connection.escape(req.body.id)+','+connection.escape(req.params.article_id)+','+connection.escape(req.body.content)+',NOW(),NOW());';
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
    sql += 'WHERE user_id='+connection.escape(user_id)+' AND article_id='+connection.escape(req.params.article_id)+';';
    connection.query(sql, function(err, result) {
      if (err) throw err;
      console.log(result);
      connection.release();
      res.json(result);
      return true;
    });
  });
});

router.post('/:article_id/checklike', function(req, res) {
  
  appPool.getConnection(function(err, connection) {
    var id = 'guest';
    // var id = req.user[0].user_id
    if (err) throw err;
    // find and replace
    var sql = 'SELECT * FROM forum_like WHERE user_id =' + connection.escape(id) + ' AND article_id = ' + connection.escape(req.params.article_id) + ';';

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

router.post('/:article_id/like', function(req, res) {
  
  appPool.getConnection(function(err, connection) {
    
    if (err) throw err;
    // find and replace
    var sql = 'SELECT * FROM forum_like WHERE user_id =' + connection.escape(req.user[0].user_id) + ' AND article_id = ' + connection.escape(req.params.article_id) + ';';

    connection.query(sql, function(err, result) {
      if (err) throw err;
      console.log('in the first query\n');

      // user already like the article
      console.log(result.length);
      if (result.length > 0) {
        var sql2 = 'DELETE FROM forum_like WHERE user_id =' + connection.escape(req.user[0].user_id) + ' AND article_id = ' + connection.escape(req.params.article_id) + ';';
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
        sql2 += 'VALUES (' + connection.escape(req.user[0].user_id) + ',' + connection.escape(req.params.article_id) + ');';
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

module.exports = router;