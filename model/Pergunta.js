const Sequelize = require("sequelize");
const connection = require("./database");
//Criar tabela no mysql
const Pergunta = connection.define("pergunta", {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});
Pergunta.sync({ force: false }).then(() => {});
