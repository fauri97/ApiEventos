require('dotenv').config();
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER_EMAIL || 'testeenvioemailapilucas@gmail.com',
        pass: process.env.PASS_EMAIL
    }
});

module.exports = transporter;
