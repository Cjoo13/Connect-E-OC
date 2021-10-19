const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql'
    }
);

sequelize.sync(err => {
    console.log('Problème de synchronisation avec la base de données');
});


module.exports = sequelize;