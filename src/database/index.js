const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../app/models/User');
const Cliente = require('../app/models/Cliente');
const Fornecedor = require('../app/models/Fornecedor');

const connection = new Sequelize(dbConfig);

User.init(connection);
Cliente.init(connection);
Cliente.associate(connection.models);
Fornecedor.init(connection);
Fornecedor.associate(connection.models);

module.exports = connection;