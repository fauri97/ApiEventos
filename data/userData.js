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
};

//get User by id
exports.getUserById = async function (id) {
  try {
    return User.findByPk(id, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  } catch (e) {
    throw new Error(e);
  }
};

//delete user by id
exports.deleteUserByID = async function (id) {
  try {
    return User.destroy({
      where: {id: id},
    });
  } catch (e) {
    throw new Error(e);
  }
};

//update a user
exports.updateUser = async function (id, userUpdated) {
  const user = await User.findByPk(id);
  if (user === null){
    throw new Error('User not found')
  }
  try{
    if(userUpdated.name != undefined) user.name = userUpdated.name
    if(userUpdated.password != undefined) user.password = userUpdated.password
    if(userUpdated.email != undefined) user.email = userUpdated.email
    return user.save();
  } catch (e){
    throw new Error(e);
  }
};