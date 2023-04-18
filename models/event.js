const Sequelize = require('sequelize');
const Database = require("../infra/database");
const User = require('./user');
const EventUser = require('./eventUser');

const Event = Database.define('Event', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    vacancies: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    vacanciesFilled: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Event.belongsToMany(User, { 
    through: 'EventUser',
    constraint: true
})

User.belongsToMany(Event,{
    through: 'EventUser',
    constraint: true
})

Event.hasMany(EventUser, { foreignKey: 'EventId' });
EventUser.belongsTo(Event, { foreignKey: 'EventId' });
User.hasMany(EventUser, { foreignKey: 'UserId' });
EventUser.belongsTo(EventUser, { foreignKey: 'UserId' });

module.exports = Event;