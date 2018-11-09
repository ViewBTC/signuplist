var mysql = require('mysql');
var config = require('../config/config.js');
var exports = module.exports = {};

var connection = null;
connection = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
});
connection.connect();

exports.init = function(callback) {
    connection.query(`
CREATE TABLE IF NOT EXISTS \`signups\` (
  \`email\` varchar(250) NOT NULL,
  \`firstname\` varchar(200) DEFAULT NULL,
  \`lastname\` varchar(200) DEFAULT NULL,
  \`token\` varchar(200) DEFAULT NULL,
  \`etp_address\` varchar(200) DEFAULT NULL,
  \`status\` varchar(10) NOT NULL DEFAULT 'unverified',
  \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`language\` varchar(2) DEFAULT NULL,
  PRIMARY KEY (\`email\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`, callback)
}

// add the newly registar
exports.adduser = function(email, firstname, lastname, token, etp_address, language, callback) {
    connection.query('INSERT INTO `signups` (`email`,`firstname`,`lastname`,`token`,`etp_address`, `language`) VALUES (?,?,?,?,?,?);', [email, firstname, lastname, token, etp_address, language], function(err, result) {
        if (err) {
            callback(err);
        } else {
            callback(false, 1);
        }
    });
}

exports.getUsers = function(callback){
    connection.query('SELECT email, firstname, lastname, etp_address, language, status FROM `signups`;', callback);
}

// Validate token & if email has already been verified
exports.validatetoken = function(token, callback) {
    connection.query('SELECT * FROM `signups` WHERE `token` = ? AND status = "unverified";', [token], function(err, rows, fields) {
        if (rows.length > 0) {
            connection.query('UPDATE `signups` SET status = "verified" WHERE `token` = ? AND status = "unverified";', [token], function(err, rows, fields) {
                callback(true);
            });
        } else {
            callback(false);
        }
    });
}
