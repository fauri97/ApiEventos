require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'eventos',
    process.env.USER_DB,
    process.env.PASS_DB,

    {
        logging: false,
        dialect: 'postgres',
        host: 'localhost',
        dialectOptions: {
            useUTC: false, // for reading from database
          },
          timezone: '-03:00'
    }
);

module.exports = sequelize;