require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "Outlook",
    auth: {
      user: process.env.USER_EMAIL, // endereço de e-mail do remetente
      pass: process.env.PASS_EMAIL, // senha da conta de e-mail do remetente
    },
  });
  

module.exports = transporter;
