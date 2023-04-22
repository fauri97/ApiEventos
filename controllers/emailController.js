require("dotenv").config();

exports.createEmail = async function (email, Subject, Body) {
  console.log(email);
  console.log(Subject);
  console.log(Body);
  if (!email || !Subject || !Body) {
    throw new Error("Invalid email parameters");
  }

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: email,
    subject: Subject,
    text: Body,
  };
  return mailOptions;
};