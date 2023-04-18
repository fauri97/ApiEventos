const database = require("../infra/database");
const User = require("../models/user");

//Adiciona novo usuario no banco de dados
exports.saveUser = async function (user) {
    try {
        await database.sync();
        const newUser = await User.create({
            name: user.name,
            email: user.email,
            password: user.password,
        });
        delete newUser.dataValues.createdAt;
        delete newUser.dataValues.updatedAt;
        delete newUser.dataValues.password;
        return newUser;
    } catch (e) {
        throw new Error(e);
    }
};

//Retorna um usuario pelo email
exports.getUserByEmail = async function (email) {
    try {
        await database.sync();
        return User.findOne({
            where: {
                email: email,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });
    } catch (e) {
        throw new Error(e);
    }
}