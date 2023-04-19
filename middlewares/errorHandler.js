const logger = require("../utils/logger");

//Mapas de erros que podem retornar das APIs
const errorMappings = {
    'Usuario já existe com este email': 409,
    'Usuario não encontrado': 404,
    'Token não recebido': 401,
    'Token invalido': 403,
    'Usuario não autenticado': 403,
    'Email não encontrado': 404,
    'Usuario não encontrado!': 404,
    'Senha incorreta': 403,
    'Erro ao fazer checkIn, usuario não está inscrito no evento': 401,
    'Já existe um certificado cadastrado para esse usuario neste evento!': 409,
    'usuario já inscrito no evento': 409 
}

//Verifica se o erro está no mapa de erros, caso não estejá essa função retornatá "Algo deu errado" com status code 500
exports.errorHandler = function (error, req, res, next) {
    const message = error.message || 'Algo deu errado'
    const status = errorMappings[message] || 500

    if (status === 500) {
        logger.error(error.message);
        return res.status(status).send(message)
    } else if (status === 401 || status === 403) {
        logger.error(message);
        return res.status(status).json({ error: message })
    } else {
        logger.error(message);
        return res.status(status).send(message)
    }
}
