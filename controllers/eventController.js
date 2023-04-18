const eventData = require('../data/eventData');

//Passa o evento para salvar no banco de dados
exports.saveEvent = async function (event) {
    return await eventData.saveEvent(event);
}

//Retorna todos os eventos
exports.getEvents = async function () {
    return await eventData.getEvents();
}


//INSCREVE USUARIO NO EVENTO

exports.registerUserOnEvent = async function (eventId, userId) {
    let event = await eventData.getEventById(eventId);
    if (event.vacancies == event.vacanciesFilled) {
        return { message: "vagas cheias" }
    }
    if (await eventData.registerUserOnEvent(eventId, userId)) {
        event.vacanciesFilled++;
        await eventData.updateEvent(event);
        return { message: "Usuario cadastrado no evento!" }
    }
    return { message: "Ocorreu um erro ao registrar o usuario no evento" }
};

//REGISTRA O CHECK IN NO EVENTO
exports.registerCheckInOnEvent = async function (eventId, userId) {
    if(eventData.registerCheckInOnEvent(eventId, userId))return { message: 'checkin efeituado com sucesso!' };
    throw new Error('Erro ao fazer checkIn, usuario não está inscrito no evento')
}