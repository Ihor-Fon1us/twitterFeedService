const Sequelize = require('sequelize');
const { url } = require('../../config/config');

module.exports = new Sequelize(url.cockroach);
