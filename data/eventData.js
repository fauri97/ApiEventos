const database = require("../infra/database");
const Event = require("../models/event");
const EventUser = require('../models/eventUser');

//Adicionar novo evento no banco de dados:
exports.saveEvent = async function (event) {
    try {
        await database.sync();
        const newEvent = await Event.create({
            name: event.name,
            description: event.description,
            vacancies: event.vacancies,
            vacanciesFilled: 0
        });
        return newEvent;
    } catch (e) {
        throw new Error(e);
    }
};

//Retorna todos eventos registrados
exports.getEvents = async function () {
    try {
        await database.sync();
        const events = await Event.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        })
        return events
    } catch (e) {
        throw new Error(e)
    }
}

//Retorna evento pelo id
exports.getEventById = async function (eventId) {
    try {
        await database.sync();
        const event = await Event.findByPk(eventId);
        return event;
    } catch (e) {
        throw new Error(e);
    }
}

//Atualiza um evento
exports.updateEvent = async function (updatedEvent) {
    try {
        await database.sync();
        let event = await Event.findByPk(updatedEvent.id)

        if (event.name != undefined) {
            event.name = updatedEvent.name;
        }
        if (event.description != undefined) {
            event.description = updatedEvent.description;
        }
        if (event.vacancies != undefined) {
            event.vacancies = updatedEvent.vacancies;
        }
        if (event.vacanciesFilled != undefined) {
            event.vacanciesFilled = updatedEvent.vacanciesFilled
        }
        return event.save();
    } catch (e) {
        throw new Error(e)
    }
}


//INSCREVE USUARIO NO EVENTO
exports.registerUserOnEvent = async function (eventId, userId) {
    await database.sync();
    const event = await Event.findByPk(eventId);
    try {
        if (await event.addUser(userId)) return true
        return false
    } catch (e) {
        throw new Error(e);
    }
};

//REGISTRA O CHECKIN NO EVENTO
exports.registerCheckInOnEvent = async function (eventId, userId) {
    await database.sync();
    try {
        const eventUser = await EventUser.findOne({
            where: { UserId: userId, EventId: eventId }
        });
        console.log(eventUser)
        if (eventUser == null){
            return false
        }
        eventUser.presence = true;
        eventUser.save();
        return true
    } catch (e) {
        throw new Error(e)
    }
}

//CANCELA O USUARIO DO EVENTO
exports.deleteUserFromEvent = async function (eventId, userId) {
    await database.sync();
    let eventUser = await EventUser.findOne({
        where: { UserId: userId, EventId: eventId }
    });
    return eventUser.delete();
}