const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../app/models/User');
const Cliente = require('../app/models/Cliente');

const connection = new Sequelize(dbConfig);

User.init(connection);
Cliente.init(connection);


module.exports = connection;