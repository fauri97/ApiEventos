const certificateData = require('../data/certificateData');
const PDFDocument = require('pdfkit');
const fs = require('fs')

exports.generateCertificate = async function (userId, eventId) {
    const certificate = await certificateData.getCertificate(userId, eventId);
    if (!certificate || certificate == undefined) {
        return await certificateData.generateCertificate(userId, eventId);
    } else {
        throw new Error('Já existe um certificado cadastrado para esse usuario neste evento!')
    }
}

exports.getCertificate = async function (userId, eventId) {
    return await certificateData.getCertificate(userId, eventId);
}

exports.generatePDF = async function (userId, eventId) {
    const certificate = await certificateData.getCertificate(userId, eventId);
    const doc = new PDFDocument({ size: 'A4', margin: 50 });

    doc.pipe(fs.createWriteStream('certificado.pdf'));

    doc.font('Times-Bold').fontSize(20).text('Certificado de Participação', { align: 'center' });
    doc.moveDown();

    doc.font('Times-Roman').fontSize(14).text('Certificamos que', { align: 'center' });
    doc.moveDown();

    doc.font('Times-Bold').fontSize(16).text(certificate.userName, { align: 'center' });
    doc.moveDown();

    doc.font('Times-Roman').fontSize(14).text('participou do evento', { align: 'center' });
    doc.moveDown();

    doc.font('Times-Bold').fontSize(16).text(certificate.eventName, { align: 'center' });
    doc.moveDown();
    doc.font('Times-Roman').fontSize(14).text(`Para validar o certificado acesse: localhost:8082/certificate/${certificate.certificateId}`, { align: 'end' });
    doc.moveDown();
    doc.end();

    return doc;
}