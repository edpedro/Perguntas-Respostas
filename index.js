const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//utilizando EJS
app.set("view engine", "ejs");
app.use(express.static("public"));
//Body Parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Rotas
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpegunta", (req, res) => {
  var tit = req.body.titulo;
  var des = req.body.descricao;

  res.send(`formulario recebindo:  Titulo: ${tit} e Descrição ${des} `);
});

app.listen(4000, () => {
  console.log("Sevirdor ON");
});
