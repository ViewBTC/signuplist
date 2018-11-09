var express = require('express')
var csv = require('csv-express')

var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var mailer = require('./models/mail.js')
var crypto = require('crypto')
var cors = require('cors')

var db = require('./models/database.js')
var config = require('./config/config.js')

var app = express()

const APP_PORT = 80

app.use(express.static('public'))

var index = require('./routes/index')
var users = require('./routes/users')

// view /^0^/ PUGGS engine setup
app.set('view engine', 'pug')

/*---------Cors ----------*/
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});

app.get('/init', function(req, res) {
    db.init((err) => {
        if (err) res.status(400).json({
            success: 0,
            message: 'error initializing db'
        })
        else res.status(200).json({
            success: 1
        })
    });
});

app.get('/list.csv', function(req, res) {
    let token = req.query.token

    if (token && token == process.env.LIST_TOKEN) {
        db.getUsers((err, list, fields) => {
            if (err) {
                console.error(err)
                res.status(400).send('error');
            } else {
                res.csv(list);
            }
        })
    } else {
        console.info('invalid auth token ' + token)
        res.status(400).send('invalid auth. incident reported.');
    }
});

app.get('/verify', function(req, res) {
    var token = req.query.token;
    var language = req.query.language;
    switch (language) {
        case 'en':
        case 'zh':
            break
        default:
            language = 'en'
    }
    var translation = config.translation[language];

    db.validatetoken(token, function(suc) {
        if (suc) {
            res.render('index', {
                title: translation.titleY,
                message: translation.messageY
            });
        } else {
            res.render('index', {
                title: translation.titleN,
                message: translation.messageN
            });
        }
    });
});


app.get('/signup', function(req, res) {
    var email = req.query.email;
    var lastname = req.query.lastname;
    var firstname = req.query.firstname;
    var etp_address = req.query.etp_address;
    var language = req.query.language;

    console.info(`signup request for ${email} name: ${lastname}, ${firstname} address: ${etp_address} language preference: ${language}`)
    var verified = 'unverified';

    // Create token
    var random = Math.random().toString();
    var token = crypto.createHash('sha1').update(email + random).digest('hex');

    if (validateEmail(email)) {

        //language failsafe
        if (language == null) {
            language = 'en';
        }

        // Add user to database
        db.adduser(email, firstname, lastname, token, etp_address, language, function(err, suc) {
            if (err) {
                res.json({
                    "success": false,
                    "message": "EMAIL_EXISTS"
                });
            } else {
                // Send user email, after validate email address
                mailer.mail(firstname, email, token, language);
                res.json({
                    "success": true
                });
            }
        });

    } else {
        // do somthing
        res.json({
            "success": false,
            "message": "EMAIL_INVALID"
        });

    }
});

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

app.listen(APP_PORT, function() {
    console.log(`Signup up and running on port ${APP_PORT}!`);
});
