const Sequelize = require('sequelize');
const { url } = require('../../config/config');

const sequelize = new Sequelize(url.cockroach);

module.exports = sequelize;
