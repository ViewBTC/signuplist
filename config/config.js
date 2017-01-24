module.exports.mail = {
  account:  '', // viewfin email
  password: '', // viewfin email pwd
  host:     'smtp.exmail.qq.com',
  from:     '"Viewfin" <>' // <viewfin emai>

};

module.exports.db = {
  host:     'localhost',
  user:     'root', // db usr
  password: '', // db pwd
  database: 'viewfin' // db name
};

module.exports.general = {
  host:     'http://localhost:3000'
};


// Translation Section
var translation = {};

translation.en = {
  subject:  'Hello, please verify your email',
  htmlF:    'Click the following link to confirm your account:',
  htmlL:    'verify me',
  titleY:   'Valid token',
  messageY: 'Thank you for signing up to our newsletter.',
  titleN:   'Invalid token',
  messageN: 'Your token is not valid.'
};

translation.zh = {
  subject:  ' 您好请核实您的电子邮件。 ',
  htmlF:    '点击以下链接确认您的帐户',
  htmlL:    '验证了我',
  titleY:   '有效的令牌',
  messageY: '感谢您报名参加我们的时事通讯。 ',
  titleN:   '无效的标记',
  messageN: '您的令牌无效。'
};

module.exports.translation = translation;
