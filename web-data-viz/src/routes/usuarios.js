var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/quiz", function (req, res){
    usuarioController.quiz(req,res);
});

router.get("/vezesJogadas", function (req, res) {
    usuarioController.vezesJogadas(req, res);
});

router.get("/maiorPontuacao", function (req, res) {
    usuarioController.obterMaiorPontuacao(req, res);
});

router.get("/menorPontuacao", function (req, res) {
    usuarioController.obterMenorPontuacao(req, res);
});

router.get('/totalPontuacao', function(req, res) {
    usuarioController.obterTotalPontuacao(req, res);
});

router.get('/obterTresMaioresPontuacoes', function(req, res) {
    usuarioController.obterTresMaioresPontuacoes(req, res);
});

module.exports = router;