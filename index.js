const express = require("express");
const app = express();
const moment = require("moment");
const bodyParser = require("body-parser");
var dateFormat = require("dateformat");
const connection = require("./model/database");
const Pergunta = require("./model/Pergunta");
const Resposta = require("./model/Resposta");

//database
connection
  .authenticate()
  .then(() => {
    console.log("conexão feita com o banco");
  })
  .catch(msgErro => {
    console.log(msgErro);
  });

//utilizando EJS
app.set("view engine", "ejs");
app.use(express.static("public"));
//Body Parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Rotas
//Exibir pagina e listando
app.get("/", (req, res) => {
  Pergunta.findAll({ raw: true, order: [["id", "DESC"]] }).then(perguntas => {
    res.render("index", {
      perguntas: perguntas,
      moment: moment
    });
  });
});
//Exibir pagina
app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});
//Salvando no banco
app.post("/salvarpegunta", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;

  Pergunta.create({
    titulo: titulo,
    descricao: descricao
  }).then(() => {
    res.redirect("/");
  });
});
//Pegando id, e listar
app.get("/pergunta/:id", (req, res) => {
  var id = req.params.id;
  Pergunta.findOne({
    where: { id: id }
  }).then(pergunta => {
    if (pergunta != undefined) {
      Resposta.findAll({
        where: { PerguntaId: pergunta.id }, //buscando id na tabela de respostas
        order: [["id", "DESC"]]
      }).then(respostas => {
        res.render("listarPergunta", {
          pergunta: pergunta,
          respostas: respostas
        });
      });
    } else {
      res.redirect("/");
    }
  });
});
//Salvando resposta
app.post("/responder", (req, res) => {
  var corpo = req.body.corpo;
  var PerguntaId = req.body.pergunta;
  Resposta.create({
    corpo: corpo,
    PerguntaId: PerguntaId
  }).then(() => {
    res.redirect("/pergunta/" + PerguntaId);
  });
});
//Porta 4000
app.listen(4000, () => {
  console.log("Sevirdor ON");
});
