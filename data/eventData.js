const database = require("../infra/database");
const Event = require("../models/event");
const EventUser = require("../models/eventUser");

//Adicionar novo evento no banco de dados:
exports.saveEvent = async function (event) {
  try {
    await database.sync();
    const newEvent = await Event.create({
      name: event.name,
      description: event.description,
      vacancies: event.vacancies,
      vacanciesFilled: 0,
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
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["id", "ASC"]],
    });
    return events;
  } catch (e) {
    throw new Error(e);
  }
};

//Retorna os eventos que o usuario está inscrito
exports.getEventsOfUser = async function (userId) {
  try {
    await database.sync();
    const events = await EventUser.findAll({
      where: { UserId: userId },
      include: {
        model: Event,
        attributes: [
          "id",
          "name",
          "description",
          "vacancies",
          "vacanciesFilled",
        ],
      },
      order: [["id", "ASC"]],
    });
    return events.map((eventUser) => eventUser.Event);
  } catch (e) {
    throw new Error(e);
  }
};

//retorna o evento que o usuario está inscrito
exports.getEventsUserEvent = async function (userId, eventId) {
  try {
    await database.sync();
    const events = await EventUser.findOne({
      where: { UserId: userId, EventId: eventId },
      include: {
        model: Event,
        attributes: [
          "id",
          "name",
          "description",
          "vacancies",
          "vacanciesFilled",
        ],
      },
    });
    return events;
  } catch (e) {
    throw new Error(e);
  }
};

//Retorna evento pelo id
exports.getEventById = async function (eventId) {
  try {
    await database.sync();
    const event = await Event.findByPk(eventId);
    return event;
  } catch (e) {
    throw new Error(e);
  }
};

//Atualiza um evento
exports.updateEvent = async function (updatedEvent) {
  try {
    await database.sync();
    console.log('pre event findByPk')
    let event = await Event.findByPk(updatedEvent.id);

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
      event.vacanciesFilled = updatedEvent.vacanciesFilled;
    }
    return event.save();
  } catch (e) {
    throw new Error(e);
  }
};

//INSCREVE USUARIO NO EVENTO
exports.registerUserOnEvent = async function (eventId, userId) {
  await database.sync();
  const event = await Event.findByPk(eventId);
  try {
    if (await event.addUser(userId)) return true;
    return false;
  } catch (e) {
    throw new Error(e);
  }
};

//REGISTRA O CHECKIN NO EVENTO
exports.registerCheckInOnEvent = async function (eventId, userId) {
  await database.sync();
  try {
    const eventUser = await EventUser.findOne({
      where: { UserId: userId, EventId: eventId },
    });
    //Verifica se o usuario está cadastrado
    if (!eventUser || eventUser.UserId === null) {
      return false;
    }
    //verifica se o usuario já fez check in no evento
    if (eventUser.presence) throw new Error("usuario já inscrito no evento");
    eventUser.presence = true;
    eventUser.save();
    return true;
  } catch (e) {
    throw new Error(e);
  }
};

//DESFAZ A INSCRIÇÂO DO USUARIO NO EVENTO
exports.unregisterUserFromEvent = async function (eventId, userId) {
  await database.sync();
  const event = await Event.findByPk(eventId);
  try {
    if (await event.removeUser(userId)) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    throw new Error(e);
  }
};

//delete event
exports.deleteEvent = async function (id) {
  try {
    return Event.destroy({
      where: { id: id },
    });
  } catch (e) {
    throw new Error(e);
  }
};
