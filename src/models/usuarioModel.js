var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function quiz(usuario, quiz, pontuacao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", usuario, quiz, pontuacao);

    var instrucaoSql = `
    INSERT INTO resposta (fkUsuario, fkQuiz, pontuacao) VALUES (${usuario}, ${quiz}, ${pontuacao});
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function vezesJogadas(usuarioId) {
    console.log("Acessando o método obterTotalJogadas no usuárioModel");

    var instrucaoSql = `
        SELECT COUNT(*) AS total_jogadas
        FROM resposta
        WHERE fkUsuario = ${usuarioId};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterMaiorPontuacao(usuarioId) {
    var instrucaoSql = `
        SELECT MAX(pontuacao) AS maior_pontuacao
        FROM resposta
        WHERE fkUsuario = ${usuarioId};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterMenorPontuacao(usuarioId) {
    var instrucaoSql = `
        SELECT MIN(pontuacao) AS menor_pontuacao
        FROM resposta
        WHERE fkUsuario = ${usuarioId};
    `;
    return database.executar(instrucaoSql);
}

function obterTotalPontuacao(usuarioId) {
    console.log("Acessando o método obterTotalPontuacao no modelo do usuário");
    var instrucaoSql = `
        SELECT SUM(pontuacao) AS total_pontuacao
        FROM resposta
        WHERE fkUsuario = ${usuarioId};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterTresMaioresPontuacoes() {
    console.log("Acessando o método obterTresMaioresPontuacoes no modelo do usuário");
    var instrucaoSql = `
        SELECT usuario.nome, SUM(resposta.pontuacao) AS total_pontuacao
        FROM usuario
        JOIN resposta ON usuario.id = resposta.fkUsuario
        GROUP BY usuario.id, usuario.nome
        ORDER BY total_pontuacao DESC
        LIMIT 3;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function nomeUsuario(usuarioId) {
    console.log("Acessando o método nome no modelo do usuário");
    var instrucaoSql = `
    SELECT usuario.nome  AS nome_Usuario
    FROM usuario WHERE id = ${usuarioId};

    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function contarTotalUsuarios() {
    console.log("Acessando o método contarTotalUsuarios no modelo do usuário");
    var instrucaoSql = `
    SELECT COUNT(*) AS total_usuarios FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterRankingPontuacao() {
    console.log("Acessando o método obterRankingPontuacao no modelo do usuário");
    var instrucaoSql = `
    SELECT usuario.nome, SUM(resposta.pontuacao) AS total_pontuacao, COUNT(resposta.idResposta) AS total_jogadas
    FROM usuario
    LEFT JOIN resposta ON usuario.id = resposta.fkUsuario
    GROUP BY usuario.id, usuario.nome
    ORDER BY total_pontuacao DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarReview(usuarioId, titulo, descricao) {
    var instrucaoSql = `
        INSERT INTO review (fkUsuario, titulo, descricao, data_publicacao)
        VALUES (${usuarioId}, '${titulo}', '${descricao}', NOW());
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function obterReviews() {
    var instrucaoSql = `
    SELECT 
    r.idReview,
    u.nome,
    DATE_FORMAT(r.data_publicacao, '%d/%m/%Y %H:%i:%s') AS data_publicacao_formatada,
    r.titulo,
    r.descricao,
    r.qtd_curtidas
FROM review r
INNER JOIN usuario u ON r.fkUsuario = u.id
ORDER BY r.data_publicacao DESC;


    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function obterTodasPontuacoes(usuarioId) {
    console.log("Acessando o método obterTodasPontuacoes no modelo do usuário");
    var instrucaoSql = `
        SELECT resposta.pontuacao
        FROM resposta
        WHERE resposta.fkUsuario = ${usuarioId}
        ORDER BY resposta.idResposta ASC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
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
    obterTodasPontuacoes
};
