// connecting to Mysql Database
const {Sequelize} = require("sequelize")

const db_connection = new Sequelize('test', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });

  
  db_connection.authenticate().then(() => {
     console.log('Connection has been established successfully.');
  }).catch((error) => {
     console.error('Unable to connect to the database: ', error);
  });

  module.exports = db_connection