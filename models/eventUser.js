
const Sequelize = require('sequelize');
const database = require("../infra/database");

const eventUser = database.define('EventUser', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    presence: Sequelize.BOOLEAN



})
module.exports = eventUser;