const express = require("express");
const app = express();
const bodyParser = require("body-parser");
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
app.get("/", (req, res) => {
  Pergunta.findAll({ raw: true, order: [["id", "DESC"]] }).then(perguntas => {
    res.render("index", {
      perguntas: perguntas
    });
  });
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

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

app.get("/pergunta/:id", (req, res) => {
  var id = req.params.id;
  Pergunta.findOne({
    where: { id: id }
  }).then(pergunta => {
    if (pergunta != undefined) {
      res.render("listarPergunta", {
        pergunta: pergunta
      });
    } else {
      res.redirect("/");
    }
  });
});

app.listen(4000, () => {
  console.log("Sevirdor ON");
});
