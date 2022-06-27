const Sequelize = require('sequelize');
const sequelizeStream = require('node-sequelize-stream');
const sequelize = require('../db/cockroachdb/connect');

const Twitt = sequelize.define('Twitt', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nickname: {
    type: Sequelize.STRING,
  },
  text: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});
sequelizeStream(sequelize);
Twitt.sync({
  force: false,
});
module.exports = Twitt;
