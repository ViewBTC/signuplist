var nodemailer = require('nodemailer');
var exports = module.exports = {};
var HOST = 'http://localhost:3000';

/*-----------------Nodemailer 2v---------------------*/
exports.function mail(email, token, language) {

  var account = encodeURIComponent('aaron@viewfin.com');
  var password = encodeURIComponent('b@ckdOOr91');
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
