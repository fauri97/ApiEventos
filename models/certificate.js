const Sequelize = require('sequelize');
const Database = require("../infra/database");
const User = require('./user')
const Event = require('./event');


const Certificate = Database.define('Certificate', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    
});

Certificate.belongsTo(User, { foreignKey: 'UserId' });
Certificate.belongsTo(Event, { foreignKey: 'EventId' });

module.exports = Certificate;