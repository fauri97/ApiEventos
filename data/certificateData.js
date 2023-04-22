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
                attributes: ['id','name']
            },
            {
                model: Event,
                attributes: ['id','name', 'description']
            }
        ]
    });

    if (!certificate || certificate == undefined) {
        return undefined
    }
    else {
        return {
            certificateId: certificate.id,
            userId: certificate.User.id,
            userName: certificate.User.name,
            eventId: certificate.Event.id,
            eventName: certificate.Event.name,
            eventDescription: certificate.Event.description
        };
    }
};

exports.getAllCertificatesOfAUser = async function (userId) {
    try{
        const certificates = await Certificate.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id','name']
                },
                {
                    model: Event,
                    attributes: ['id','name', 'description']
                }
            ],
            where: {UserId: userId}
        });
        return certificates;
    }catch(e){
        throw new Error(e);
    }
}