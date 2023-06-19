require("dotenv").config();
const eventData = require("../data/eventData");
const certificateController = require("./certificateController");
const userController = require("./userController");
const emailController = require("./emailController");

//Passa o evento para salvar no banco de dados
exports.saveEvent = async function (event) {
  return await eventData.saveEvent(event);
};

//Retorna todos os eventos
exports.getEvents = async function () {
  return await eventData.getEvents();
};

//Retorna todos eventos que um usuario está registrado
exports.getEventsOfUser = async function (userId) {
  return await eventData.getEventsOfUser(userId);
};

//Retorna um evento onde o usuairo está registrado
exports.getEventsUserEvent = async function (userId, eventId) {
  const event = await eventData.getEventsUserEvent(userId, eventId);
  if (event != null) {
    return event;
  }
  throw new Error("Usuario não registrado no evento!");
};

//INSCREVE USUARIO NO EVENTO
exports.registerUserOnEvent = async function (eventId, userId) {
  let event = await eventData.getEventById(eventId);
  //Verifica se o evento está lotado
  if (event.vacancies == event.vacanciesFilled) {
    throw new Error("vagas cheias no evento");
  }
  //Registra o usuario no evento
  if (await eventData.registerUserOnEvent(eventId, userId)) {
    //dados do corpo do email
    const user = await userController.getUserById(userId);
    const subject = `Inscrição do evento: ${event.name}`;
    const body = `Inscrição do evento efetuada com sucesso!`;

    //Envia o email de confirmação de registro no evento
    emailController.sendEmail(user.email, subject, body);

    //Atualiza o numero de usuarios registrados no evento
    event.vacanciesFilled++;
    //Atualiza o banco
    await eventData.updateEvent(event);
    //Retorna a mensagem de sucesso
    return { message: "Usuario cadastrado no evento!" };
  }
  throw new Error("Ocorreu um erro ao inscrever o usuario no evento");
};

//REGISTRA O CHECK IN NO EVENTO
exports.registerCheckInOnEvent = async function (eventId, userId) {
  //Tenta fazer o registro do usuario no evento
  try {
    if (await eventData.registerCheckInOnEvent(eventId, userId)) {
      //retorna o evento
      let event = await eventData.getEventById(eventId);

      //dados do corpo do email
      const user = await userController.getUserById(userId);
      const subject = `Presença do evento: ${event.name}`;
      const body = `Presença no evento efetuada com sucesso!`;

      //envia o email
      emailController.sendEmail(user.email, subject, body);

      //Ao fazer checkin gera automaticamente um certificado de presença
      certificateController.generateCertificate(userId, eventId);

      //Retorna mensagem de sucesso
      return { message: "checkin efeituado com sucesso!" };
    } else {
      //Caso o usuario já havia se registrado retorna esse erro
      throw new Error(
        "Erro ao fazer checkIn, usuario não está inscrito no evento"
      );
    }
  } catch (e) {
    throw new Error(e);
  }
};

//DESFAZ A INSCRIÇÂO DO USUARIO NO EVENTO
exports.unregisterUserFromEvent = async function (eventId, userId) {
  //retorna o evento
  let event = await eventData.getEventById(eventId);
  //tenta desfazer o registro do usuario do evento
  if (await eventData.unregisterUserFromEvent(eventId, userId)) {
    //diminui o numero de vagas ocupadas
    event.vacanciesFilled--;
    //atualiza o evento no banco de dados
    await eventData.updateEvent(event);

    //dados do corpo do email
    const user = await userController.getUserById(userId);
    const subject = `Inscrição do evento: ${event.name} cancelada`;
    const body = `Inscrição no evento foi cancelada!`;

    //envia o email
    emailController.sendEmail(user.email, subject, body);
    //retona mensagem de sucesso ao desinscrever o usuario do evento
    return {
      message: `Usuario desfez a inscrição no evento ${event.name}`,
    };
  }
  //Retorna um erro caso não consiga desfazer a inscrição do usuario
  throw new Error("Ocorreu um erro ao desfazer a inscrição do usuario");
};

//delete a event
exports.deleteEvent = async function (id) {
  return await eventData.deleteEvent(id);
};
