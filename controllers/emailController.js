exports.createEmail = async function (to, subject, body) {
  const mailOptions = {
    from: "testeenvioemailapilucas@gmail.com",
    to: to,
    subject: subject,
    text: body,
  };
  return mailOptions;
};
