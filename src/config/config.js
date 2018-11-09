module.exports.mail = {
    account: (process.env.EMAIL_USER) ? process.env.EMAIL_USER : '',
    password: (process.env.EMAIL_PASS) ? process.env.EMAIL_PASS : '',
    host: (process.env.EMAIL_HOST) ? process.env.EMAIL_HOST : '',
    from: (process.env.EMAIL_FROM) ? process.env.EMAIL_FROM : '"Metaverse" <no-reply@mvs.org>',
};

module.exports.db = {
    host: (process.env.MYSQL_HOST) ? process.env.MYSQL_HOST : 'localhost',
    port: (process.env.MYSQL_PORT) ? process.env.MYSQL_PORT : 3306,
    user: (process.env.MYSQL_USER) ? process.env.MYSQL_USER : 'root',
    password: (process.env.MYSQL_PASS) ? process.env.MYSQL_PASS : '',
    database: (process.env.MYSQL_NAME) ? process.env.MYSQL_NAME : 'signup',
};

module.exports.general = {
    host: (process.env.BASE_URL) ? process.env.BASE_URL : 'http://localhost',
};

// Translation Section
var translation = {};

translation.en = {
    subject: 'Hello, please verify your email',
    htmlF: 'Click the following link to confirm your account:',
    htmlL: 'verify me',
    titleY: 'Valid token',
    messageY: 'Thank you for signing up to our newsletter.',
    titleN: 'Invalid token',
    messageN: 'Your token is not valid.'
};

translation.zh = {
    subject: ' 您好请核实您的电子邮件。 ',
    htmlF: '点击以下链接确认您的帐户',
    htmlL: '验证了我',
    titleY: '有效的令牌',
    messageY: '感谢您报名参加我们的时事通讯。 ',
    titleN: '无效的标记',
    messageN: '您的令牌无效。'
};

module.exports.translation = translation;
