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

  var translation = config.translation[language];
  // setup e-mail data with unicode symbols
  var mailOptions = {
    from:     config.mail.from,
    to:       email,
    subject:  translation.subject,
    text:     token,
    html:     '<b>'+translation.htmlF+'</b><p><a href="'+HOST+'/verify?token='+token+'">'+translation.htmlL+'</a></p>'
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info) {
      if(error){
        return console.log(error);
      } else {
        return console.log('Message sent: ' + info.response);
      }
  });
};
