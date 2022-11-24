const sgMail = require('@sendgrid/mail');
const sendgridAPIKey = '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';

sgMail.setApiKey(sendgridAPIKey);

sgMail.send({
    to: 'usamabutt5144@gmail.com',
    from:'usamabutt5144@gmail.com',
    subject: 'This is test email',
    text:'Hi I hope your are fine'
})