const Sequelize = require('sequelize');
const database = require('./index');
 
const Message = database.define('messages', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    input: {
      type: Sequelize.STRING,
    },
    first: Sequelize.BOOLEAN
})
 
module.exports = Message;