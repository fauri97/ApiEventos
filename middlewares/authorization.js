require('dotenv').config();
const blockedTokens = [];
const jwt = require('jsonwebtoken');



//VALIDA OS TOKENS DE USUARIO LOGADO
exports.validarToken = function (req, res, next) {

    //VERIFICA SE A REQUISIÇÃO É POST
    if (req.method === 'POST') {
        //VERIFICA A ROTA
        if (req.path === '/user') {
            return next();
        }
        if (req.path === '/user/login') {
            return next();
        }
    }
    const token = req.headers.authorization;


    //VERIFICA SE RECEBEU O TOKEN
    if (!token) {
        return res.status(401).send({ mensagem: 'Token não fornecido.' });
    }
    const split = token.split(' ');

    //VERIFICA SE O TOKEN É VALIDO

    jwt.verify(split[1], process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).send({ mensagem: 'Token inválido.' });
        }
        if (blockedTokens.includes(token)) {
            return res.status(401).send({ mensagem: 'Token na lista negra.' });
        }
        next();
    });
}

//Adiciona o token a blacklist
exports.blockToken = function (token){
    blockedTokens.push(token)
}
