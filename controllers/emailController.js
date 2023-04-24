require("dotenv").config();
const transporter = require("../utils/email");
const logger = require("../utils/logger");


exports.sendEmail = async function (email, Subject, Body) {
  if (!email || !Subject || !Body) {
    throw new Error("Invalid email parameters");
  }

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: email,
    subject: Subject,
    text: Body,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error(error)
    } else {
      logger.info('Email enviado com Sucesso')
    }
  });
  
};