const Sequelize = require("sequelize");

const connection = new Sequelize("perguntas_respostas", "root", "12345", {
  host: "localhost",
  dialect: "mysql"
});

module.exports = connection;
