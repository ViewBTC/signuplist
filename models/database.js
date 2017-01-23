var mysql = require('mysql');
var config = require('../config/config.js');
var exports = module.exports = {};

// Declair preferences
var connection = mysql.createConnection({
  host     : config.db.host,
  user     : config.db.user,
  password : config.db.password,
  database : config.db.database
});

connection.connect();

// add the newly registar
exports.adduser = function(email,firstname,lastname,token,etp_address,language,callback){
    connection.query('INSERT INTO `signups` (`email`,`firstname`,`lastname`,`token`,`etp_address`, `language`) VALUES (?,?,?,?,?,?);',[email,firstname,lastname,token,etp_address,language], function(err,result){
      if(err) {
        callback(err);
      } else {
        callback(false,1);
      }
    });
}

// Validate token & if email has already been verified
exports.validatetoken = function(token, callback){
    connection.query('SELECT * FROM `signups` WHERE `token` = ? AND status = "unverified";',[token], function(err, rows, fields) {
      if(rows.length>0){
        connection.query('UPDATE `signups` SET status = "verified" WHERE `token` = ? AND status = "unverified";',[token], function(err, rows, fields) {
          callback(true);
        });
      }
      else{
        callback(false);
      }
    });
}
