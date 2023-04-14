//Book schema
const { Model, DataTypes } = require("sequelize")
const db_connection = require('./db')

  const Book = db_connection.define('books',{
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    release_date: {
        type: DataTypes.DATEONLY,
    },
    subject: {
        type: DataTypes.INTEGER,
    }
  });


module.exports = Book