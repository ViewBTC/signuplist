var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mailer = require('./models/mail.js');
var crypto = require('crypto');
var cors = require('cors');

var db = require('./models/database.js');
var config = require('./config/config.js');

// var tempLanguage = 'en';

var app = express();

app.use(express.static('public'));

var index = require('./routes/index');
var users = require('./routes/users');

// view /^0^/ PUGGS engine setup
app.set('view engine', 'pug');


/*---------Cors ----------*/
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/verify', function(req, res) {
	// var token = req.param('token');
  // Might have to use a global variable to store
  // look up or ask
  // var language = req.param('language');
	//var translation = config.translation[tempLanguage];


  db.validatetoken(token, function(suc) {
    if(suc) {
      res.render('index',
                { title:translation.titleY, message:translation.messageY});
    } else {
      res.render('index',
                { title:translation.titleN, message:translation.messageN});
    }
  });
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

    //language failsafe
    if (language == null) {
      language = 'en';
    }

    // Add user to database
    db.adduser(email, firstname, lastname, token, etp_address, language, function(err,suc) {
      if (err) {
      	res.json({"success": false, "message" : "EMAIL_EXISTS"});
      } else {
        // Send user email, after validate email address
        mailer.mail(email, token, language);
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
