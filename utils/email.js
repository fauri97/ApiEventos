require("dotenv").config();
const nodemailer = require("nodemailer");



const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  },
  auth: {
    user: process.env.USER_EMAIL, // endereço de e-mail do remetente
    pass: process.env.PASS_EMAIL, // senha da conta de e-mail do remetente
  },
});

module.exports = transporter;
