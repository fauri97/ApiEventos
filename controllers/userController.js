require("dotenv").config();
const userData = require('../data/userData');
const blockTOken = require('../middlewares/authorization')
const jwt = require("jsonwebtoken");

//Passa o usuario para salvar no banco de dados, validando se já existe um usuario
//com o mesmo email! Caso já possua um usuario com aquele email, retorna uma mensagem de erro ao front
exports.saveUser = async function (user) {
    const existingUser = await userData.getUserByEmail(user.email);
    if (existingUser) throw new Error('Já existe um usuario com esse email');
    return await userData.saveUser(user);
}

exports.getUserById = async function (id){
    return await userData.getUserById(id);
}

//Valida se os dados vieram certos, gera um token para o usuario fazer requisições nos outros microserviços e retorna o usuario sem a senha
exports.login = async function (user) {
    const existingUser = await userData.getUserByEmail(user.email);
    //Verifica se encontrou algum usuario com o email recebido no banco de dados
    if (!existingUser || existingUser == undefined) throw new Error('Usuario não encontrado!');
    if (existingUser.email === user.email & existingUser.password == user.password) {
        //Caso os dados passados pelos usuario estejam corretos, é criado um token de validade de uma hora para o usuario consiga fazer requisições
        //para os micro serviços
        const token = jwt.sign(
            { name: existingUser.name },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        );
        //Adiciona o token ao objeto usuario
        existingUser.dataValues.token = token;
        //deleta o campo senha do objeto usuario que retornou do banco de dados
        delete existingUser.dataValues.password;
        return existingUser;
    }
    throw new Error('Senha incorreta');
};

//Adiciona o token do usuario para uma blacklist, inutilizando o mesmo
exports.logout = async function (token) {
    blockTOken.blockToken(token);
    return {message: 'Usuario deslogado!'};
};