var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email === undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha === undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                if (resultadoAutenticar.length === 1) {
                    console.log(resultadoAutenticar);
                    var usuario = {
                        id: resultadoAutenticar[0].id,
                        email: resultadoAutenticar[0].email,
                        nome: resultadoAutenticar[0].nome,
                        senha: resultadoAutenticar[0].senha
                    };

                    res.status(200).json(usuario);
                } else if (resultadoAutenticar.length === 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            }).catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}


function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function quiz(req, res) {
    var usuario = req.body.usuarioIdServer;
    var quiz = req.body.idQuizServer;
    var pontuacao = req.body.pontuacaoServer;
    var acertos = req.body.acertosServer;
    var erros = req.body.errosServer;

    if (usuario == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (quiz == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (pontuacao == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        usuarioModel.quiz(usuario, quiz, pontuacao, acertos, erros)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function vezesJogadas(req, res) {
    var usuarioId = req.query.usuarioId;

    if (usuarioId == undefined) {
        res.status(400).send("O ID do usuário está undefined!");
    } else {
        usuarioModel.vezesJogadas(usuarioId)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.json({ total_jogadas: resultado[0].total_jogadas });
                } else {
                    res.status(404).send("Nenhum dado encontrado.");
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao obter o total de jogadas! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            });
    }
}


function obterMaiorPontuacao(req, res) {
    var usuarioId = req.query.usuarioId;

    if (usuarioId == undefined) {
        res.status(400).send("O ID do usuário está undefined!");
    } else {
        usuarioModel.obterMaiorPontuacao(usuarioId)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.json({ maior_pontuacao: resultado[0].maior_pontuacao });
                } else {
                    res.status(404).send("Nenhum dado encontrado.");
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao obter a maior pontuação! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function obterMenorPontuacao(req, res) {
    var usuarioId = req.query.usuarioId;

    if (usuarioId == undefined) {
        res.status(400).send("O ID do usuário está undefined!");
    } else {
        usuarioModel.obterMenorPontuacao(usuarioId)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.json({ menor_pontuacao: resultado[0].menor_pontuacao });
                } else {
                    res.status(404).send("Nenhum dado encontrado.");
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao obter a menor pontuação! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function obterTotalPontuacao(req, res) {
    var usuarioId = req.query.usuarioId;

    if (usuarioId == undefined) {
        res.status(400).send("O ID do usuário está indefinido.");
    } else {
        usuarioModel.obterTotalPontuacao(usuarioId)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.json({ total_pontuacao: resultado[0].total_pontuacao });
                } else {
                    res.status(404).send("Nenhuma pontuação encontrada para este usuário.");
                }
            })
            .catch(function (erro) {
                console.error("Erro ao obter o total de pontuação:", erro);
                res.status(500).json(erro);
            });
    }
}

function obterTresMaioresPontuacoes(req, res) {
    var usuarioId = req.query.usuarioId;

    if (usuarioId == undefined) {
        res.status(400).send("O ID do usuário está indefinido.");
        return;
    }
    usuarioModel.obterTresMaioresPontuacoes(usuarioId)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.json(resultado);
            } else {
                res.status(404).send("Nenhuma pontuação encontrada para este usuário.");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao obter as três maiores pontuações:", erro);
            res.status(500).json({ error: "Erro interno do servidor" });
        });
}

function nomeUsuario(req, res) {
    var usuarioId = req.query.usuarioId;

    if (usuarioId == undefined) {
        res.status(400).send("O ID do usuário está indefinido.");
        return;
    }
    usuarioModel.nomeUsuario(usuarioId)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.json(resultado[0]);
            } else {
                res.status(404).send("Nenhum nome encontrado");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao obter o nome do usuário:", erro);
            res.status(500).json({ error: "Erro interno do servidor" });
        });
}

function contarTotalUsuarios(req, res) {
    usuarioModel.contarTotalUsuarios()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.json(resultado[0]);
            } else {
                res.status(404).send("Nenhum usuário encontrado");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao contar o total de usuários:", erro);
            res.status(500).json({ error: "Erro interno do servidor" });
        });
}

function obterRankingPontuacao(req, res) {
    usuarioModel.obterRankingPontuacao()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.json(resultado);
            } else {
                res.status(404).send("Nenhuma pontuação encontrada");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao obter o ranking de pontuação:", erro);
            res.status(500).json({ error: "Erro interno do servidor" });
        });
}

function cadastrarReview(req, res) {
    var usuario = req.body.usuarioIdServer;
    var titulo = req.body.tituloServer;
    var descricao = req.body.descricaoServer;

    if (usuario == undefined) {
        res.status(400).send("O ID do usuário está indefinido!");
    } else if (titulo == undefined) {
        res.status(400).send("O título da review está indefinido!");
    } else if (descricao == undefined) {
        res.status(400).send("A descrição da review está indefinida!");
    } else {
        usuarioModel.cadastrarReview(usuario, titulo, descricao)
            .then(function (resultado) {
                res.status(201).json({ mensagem: "Review cadastrado com sucesso!" });
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o cadastro da review:", erro.sqlMessage);
                res.status(500).json({ erro: "Erro interno do servidor ao cadastrar a review" });
            });
    }
}

function obterReviews(req, res) {
    usuarioModel.obterReviews()
        .then(function (reviews) {
            res.status(200).json(reviews);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao obter as reviews:", erro.sqlMessage);
            res.status(500).json({ erro: "Erro interno do servidor ao obter as reviews" });
        });
}

function obterTodasPontuacoes(req, res) {
    var usuarioId = req.query.usuarioId;
    var quizId = req.query.quizId;

    if (usuarioId == undefined) {
        res.status(400).send("O ID do usuário está indefinido.");
        return;
    }

    if (quizId == undefined) {
        res.status(400).send("O ID do quiz está indefinido.");
        return;
    }

    usuarioModel.obterTodasPontuacoes(usuarioId, quizId)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.json(resultado);
            } else {
                res.status(404).send("Nenhuma pontuação encontrada para este usuário e quiz.");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao obter todas as pontuações:", erro);
            res.status(500).json({ error: "Erro interno do servidor" });
        });
}

function verificarCurtida(req, res) {
    var reviewId = req.query.reviewId;
    var usuarioId = req.query.userId;

    if (reviewId == undefined) {
        res.status(400).send("O ID da review está indefinido.");
        return;
    }

    if (usuarioId == undefined) {
        res.status(400).send("O ID do usuário está indefinido.");
        return;
    }

    usuarioModel.verificarCurtida(reviewId, usuarioId)
        .then(function (resultado) {
            if (resultado) {
                res.json(resultado);
            } else {
                res.status(404).send("Curtida não encontrada.");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao verificar curtida:", erro);
            res.status(500).json({ error: "Erro interno do servidor" });
        });
}

function toggleCurtida(req, res) {
    var reviewId = req.body.reviewId;
    var usuarioId = req.body.userId;

    if (reviewId == undefined) {
        res.status(400).send("O ID da review está indefinido.");
        return;
    }

    if (usuarioId == undefined) {
        res.status(400).send("O ID do usuário está indefinido.");
        return;
    }

    usuarioModel.toggleCurtida(reviewId, usuarioId)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.error("Erro ao alternar curtida:", erro);
            res.status(500).json({ error: "Erro interno do servidor" });
        });
}

module.exports = {
    autenticar,
    cadastrar,
    quiz,
    vezesJogadas,
    obterMaiorPontuacao,
    obterMenorPontuacao,
    obterTotalPontuacao,
    obterTresMaioresPontuacoes,
    nomeUsuario,
    contarTotalUsuarios,
    obterRankingPontuacao,
    cadastrarReview,
    obterReviews,
    obterTodasPontuacoes,
    verificarCurtida,
    toggleCurtida
};


