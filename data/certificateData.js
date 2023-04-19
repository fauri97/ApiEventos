const database = require('../infra/database');
const Certificate = require('../models/certificate');
const User = require('../models/user')
const Event = require('../models/event');

//Gera um certificado de um usuario
exports.generateCertificate = async function (userId, eventId) {
    await database.sync();
    const certificate = Certificate.create({
        UserId: userId, // ID do usuário
        EventId: eventId // ID do evento
    }).catch(err => {
        throw new Error('erro ao gerar o certificado: ', err)
    });
    return certificate;
}

//Retorna um certificado de um usuario
exports.getCertificate = async function (userId, eventId) {
    const certificate = await Certificate.findOne({
        where: { UserId: userId, EventId: eventId },
        include: [
            {
                model: User,
                attributes: ['name']
            },
            {
                model: Event,
                attributes: ['name', 'description']
            }
        ]
    });

    if (!certificate || certificate == undefined) {
        return undefined
    }
    else {
        return {
            certificateId: certificate.id,
            userName: certificate.User.name,
            eventName: certificate.Event.name,
            eventDescription: certificate.Event.description
        };
    }
};