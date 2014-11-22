/**
 * Created by pilagod on 11/22/14.
 */

var config = require('./config/config.js');
var mysql = require('mysql');

var conn = {};
conn.connection = mysql.createConnection({
    host    : config.db_host,
    port    : config.db_port,
    user    : config.db_username,
    password: config.db_password,
    database: config.db_name
});

conn.handleDisconnect = function () {
    conn.connection.connect(function(err) {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(conn.handleDisconnect, 2000);
        }
    });
    conn.connection.on('error', function(err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            conn.handleDisconnect();
        } else {
            throw err;
        }
    });
}

conn.handleDisconnect();

module.exports = conn;