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
    mail: (firstname, url) => `<h2>Hello ${firstname},</h2><p>thank you for signing up to our newsletter! Please confirm your email by clicking <a  href="${url}">here</a> or copy and paste this link ${url} to your browser.</p><p>We will provide weekly updates on our tech and marketing progress, as well as preview any meetups and events we will be attending.</p><p><b>Welcome to the New Reality! Best regards, The Metaverse Team<b></p>`,
    titleY: 'Valid token',
    messageY: 'Thank you for signing up to our newsletter.',
    titleN: 'Invalid token',
    messageN: 'Your token is not valid.'
};

translation.zh = {
    subject: ' 您好请核实您的电子邮件。 ',
    mail: (firstname, url) => `<h2>您好 ${firstname}，</h2><p>感谢您注册我们的时事通讯！请点击此处<a href="${url}">链接</a> 确认您的电子邮件，或将此链接 ${url} 复制并粘贴到您的浏览器。</p><p>每周，元界将提供有关我们的技术和营销进展的最新信息，并可以提前了解到我们将参加的聚会和活动信息。</p><p><b>Welcome to the New Reality！最诚挚的问候，Metaverse团队</b></p>`,
    titleY: '有效的令牌',
    messageY: '感谢您报名参加我们的时事通讯。 ',
    titleN: '无效的标记',
    messageN: '您的令牌无效。'
};

module.exports.translation = translation;
