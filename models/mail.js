var nodemailer = require('nodemailer');
var config = require('../config/config.js');
var exports = module.exports = {};
var HOST = config.general.host;

/*-----------------Nodemailer 2v---------------------*/
exports.mail = function(email, token, language) {

  var account = encodeURIComponent(config.mail.account);
  var password = encodeURIComponent(config.mail.password);
  var host = encodeURIComponent(config.mail.host);

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport('smtps://'+account+':'+password+'@'+host);

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: config.mail.from, // sender address
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
