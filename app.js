var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var mySql = require('mysql');
var cors = require('cors');

var HOST = 'http://localhost:3000';

// Update lang to Chinese for email
var mailtext= {
  "en" :
    {     "html" : `<b>Click the following link to confirm your account:</b>
          <p><a href="'+HOST+'/verify?token='+token+'">verify me</a></p>`
    },
};


var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'antipathy1',
  database : 'viewfin'
});

connection.connect();
// add token
function adduser(email,firstname,lastname,token,etp_address,language,callback){
    connection.query('INSERT INTO `signups` (`email`,`firstname`,`lastname`,`token`,`etp_address`, `language`) VALUES (?,?,?,?,?,?);',[email,firstname,lastname,token,etp_address,language], function(err,result){
      if(err) {
        callback(err);
      } else {
        callback(false,1);
      }
    });
}


function validatetoken(token, callback){
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

// Please REMOVE THIS!!!!!!!
/*-----------------Nodemailer 2v---------------------*/
function mail(email, token, language){

  var account = encodeURIComponent('aaron@viewfin.com');
  var password = encodeURIComponent('password');
  var host = encodeURIComponent('smtp.exmail.qq.com');

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport('smtps://'+account+':'+password+'@'+host);

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: '"Viewfin" <aaron@viewfin.com>', // sender address
      to: email,
      subject: 'Hello, please verify your email', // Subject line
      text: token, // plaintext body
      html: '<b>Click the following link to confirm your account:</b><p><a href="'+HOST+'/verify?token='+token+'">verify me</a></p>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
}
/*------------End-------------*/

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(__dirname + "/public"));

/*---------Cors ---------*/
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/verify', function(req, res) {
    var token = req.param('token');
    validatetoken(token, function(suc){
      if(suc) {
        //res.send('thanks man!');
        // add static jade html
        res.render('index');
      }
      else {
        res.send('Token not valid');
        // add static jade html
        res.render('error');
      }
    })

});



/*--------Collect info, add to DB----------*/
app.get('/signup', function (req, res) {
  // Testing
  console.log(req.param('email'));
  console.log(req.param('firstname'));
  console.log(req.param('lastname'));

  var email     = req.param('email');
  var lastname  = req.param('lastname');
  var firstname = req.param('firstname');
  var etp_address = req.param('etp_address');
  var language = req.param('language');
  var verified    = 'unverified';

  // Create token
  var random = Math.random().toString();
  var token = crypto.createHash('sha1').update(email + random).digest('hex');

  if (validateEmail(email)) {
    // Add user to database
    adduser(email, firstname, lastname, token, etp_address, language, function(err,suc){
      if (err) {
          res.json({"success": false, "message" : "EMAIL_EXISTS"});
      } else {
        // Send user email, after validate email address
        mail(email, token, language);
        res.json({"success": true});
      }
    });
  } else {
    // do somthing
    res.json({"success": false, "message": "EMAIL_INVALID"});
  }
});

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
