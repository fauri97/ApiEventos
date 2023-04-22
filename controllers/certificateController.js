const certificateData = require("../data/certificateData");
const PDFDocument = require("pdfkit");
const fs = require("fs");

//Gera o certificado quando o ususario faz o checkIn
exports.generateCertificate = async function (userId, eventId) {
  const certificate = await certificateData.getCertificate(userId, eventId);
  if (!certificate || certificate == undefined) {
    return await certificateData.generateCertificate(userId, eventId);
  } else {
    throw new Error(
      "Já existe um certificado cadastrado para esse usuario neste evento!"
    );
  }
};

//Valida o certificado provando que é real
exports.getCertificate = async function (userId, eventId) {
  const certificate = await certificateData.getCertificate(userId, eventId);
  return {
    message: `O certificado no nome de ${certificate.userName} é real e esteve presente no evento ${certificate.eventName}`,
  };
};

//Retorna todos os certificados e eventos que o usuario já esteve presente
exports.getAllCertificatesOfAUser = async function (userId) {
  try {
    return await certificateData.getAllCertificatesOfAUser(userId);
  } catch (e) {
    throw new Error(e);
  }
};

//Gera o pdf do certificado
exports.generatePDF = async function (userId, eventId) {
  const certificate = await certificateData.getCertificate(userId, eventId);
  const doc = new PDFDocument({ size: "A4", margin: 50 });

  return new Promise((resolve, reject) => {
    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc
      .font("Times-Bold")
      .fontSize(20)
      .text("Certificado de Participação", { align: "center" });
    doc.moveDown();

    doc
      .font("Times-Roman")
      .fontSize(14)
      .text("Certificamos que", { align: "center" });
    doc.moveDown();

    doc
      .font("Times-Bold")
      .fontSize(16)
      .text(certificate.userName, { align: "center" });
    doc.moveDown();

    doc
      .font("Times-Roman")
      .fontSize(14)
      .text("participou do evento", { align: "center" });
    doc.moveDown();

    doc
      .font("Times-Bold")
      .fontSize(16)
      .text(certificate.eventName, { align: "center" });
    doc.moveDown();
    doc
      .font("Times-Roman")
      .fontSize(14)
      .text(
        `Para validar o certificado acesse: localhost:8082/certificate/validate/${certificate.userId}/${certificate.eventId}`,
        { align: "end" }
      );
    doc.moveDown();
    doc.end();
  });
};
