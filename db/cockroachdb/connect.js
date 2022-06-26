const Sequelize = require('sequelize');
const { port } = require('../../config/config');

const sequelize = new Sequelize('postgresql://root@localhost:'+ port.cockroach +'/defaultdb?sslmode=disable');
 
module.exports = sequelize;