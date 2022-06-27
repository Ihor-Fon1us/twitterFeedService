const Sequelize = require('sequelize');
const { url } = require('../../config/config');

let sequelize = null;

async function connect() {
  console.log('Checking database connection...');
  sequelize = new Sequelize(url.cockroach);
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
}

connect().catch((err) => {
  console.error('Unable to connect to the database:', err);
});
module.exports = sequelize;
