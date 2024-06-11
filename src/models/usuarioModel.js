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

function quiz(usuario, quiz, pontuacao, acertos, erros) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", usuario, quiz, pontuacao, acertos, erros);

    var instrucaoSql = `
    INSERT INTO resposta (fkUsuario, fkQuiz, pontuacao, acertos, erros) VALUES (${usuario}, ${quiz}, ${pontuacao}, ${acertos}, ${erros});
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function vezesJogadas(usuarioId) {
    console.log("Acessando o método obterTotalJogadas no usuárioModel");

    var instrucaoSql = `
        SELECT COALESCE(COUNT(*), 0) AS total_jogadas
        FROM resposta
        WHERE fkUsuario = ${usuarioId};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function obterMaiorPontuacao(usuarioId) {
    var instrucaoSql = `
        SELECT COALESCE(MAX(pontuacao), 0) AS maior_pontuacao
        FROM resposta
        WHERE fkUsuario = ${usuarioId};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterMenorPontuacao(usuarioId) {
    var instrucaoSql = `
        SELECT COALESCE(MIN(pontuacao), 0) AS menor_pontuacao
        FROM resposta
        WHERE fkUsuario = ${usuarioId};
    `;
    return database.executar(instrucaoSql);
}

function obterTotalPontuacao(usuarioId) {
    console.log("Acessando o método obterTotalPontuacao no modelo do usuário");
    var instrucaoSql = `
        SELECT COALESCE(SUM(pontuacao), 0) AS total_pontuacao
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
   SELECT usuario.nome, COALESCE(SUM(resposta.pontuacao), 0) AS total_pontuacao, COALESCE(COUNT(resposta.idResposta), 0) AS total_jogadas
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
    return database.executar(instrucaoSql)
}

function obterReviews() {
    var instrucaoSql = `
    SELECT 
    r.idReview,
    u.nome,
    DATE_FORMAT(r.data_publicacao, '%d/%m/%Y %H:%i:%s') AS data_publicacao_formatada,
    r.titulo,
    r.descricao,
    (SELECT COUNT(*) FROM curtidas WHERE fkReview = r.idReview) AS total_curtidas
FROM review r
INNER JOIN usuario u ON r.fkUsuario = u.id
ORDER BY r.data_publicacao DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}


function obterTodasPontuacoes(usuarioId, quizId) {
    console.log("Acessando o método obterTodasPontuacoes no modelo do usuário");
    var instrucaoSql = `
        SELECT resposta.pontuacao
        FROM resposta
        WHERE resposta.fkUsuario = ${usuarioId} AND resposta.fkQuiz = ${quizId}
        ORDER BY resposta.idResposta ASC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function verificarCurtida(reviewId, usuarioId) {
    console.log("Acessando o método verificarCurtida no modelo do usuário");
    
    var instrucaoSql = `
        SELECT COUNT(*) AS curtiu
        FROM curtidas
        WHERE fkReview = ${reviewId} AND fkUsuario = ${usuarioId};
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql).then(results => {
        const curtiu = results[0].curtiu > 0;

        var totalCurtidasSql = `
            SELECT COUNT(*) AS totalCurtidas
            FROM curtidas
            WHERE fkReview = ${reviewId};
        `;

        console.log("Executando a instrução SQL: \n" + totalCurtidasSql);
        return database.executar(totalCurtidasSql).then(totalResults => {
            const totalCurtidas = totalResults[0].totalCurtidas;
            return { curtiu, totalCurtidas };
        });
    });
}

function toggleCurtida(reviewId, usuarioId) {
    console.log("Acessando o método toggleCurtida no modelo do usuário");

    var verificarSql = `
        SELECT COUNT(*) AS curtiu
        FROM curtidas
        WHERE fkReview = ${reviewId} AND fkUsuario = ${usuarioId};
    `;

    console.log("Executando a instrução SQL: \n" + verificarSql);
    return database.executar(verificarSql).then(results => {
        const curtiu = results[0].curtiu > 0;

        if (curtiu) {
            var deleteSql = `
                DELETE FROM curtidas
                WHERE fkReview = ${reviewId} AND fkUsuario = ${usuarioId};
            `;

            console.log("Executando a instrução SQL: \n" + deleteSql);
            return database.executar(deleteSql).then(() => {
                return atualizarTotalCurtidas(reviewId).then(totalCurtidas => {
                    return { curtiu: false, totalCurtidas };
                });
            });
        } else {
            var insertSql = `
                INSERT INTO curtidas (fkReview, fkUsuario)
                VALUES (${reviewId}, ${usuarioId});
            `;

            console.log("Executando a instrução SQL: \n" + insertSql);
            return database.executar(insertSql).then(() => {
                return atualizarTotalCurtidas(reviewId).then(totalCurtidas => {
                    return { curtiu: true, totalCurtidas };
                });
            });
        }
    });
}

function atualizarTotalCurtidas(reviewId) {
    var totalCurtidasSql = `
        SELECT COUNT(*) AS totalCurtidas
        FROM curtidas
        WHERE fkReview = ${reviewId};
    `;

    console.log("Executando a instrução SQL: \n" + totalCurtidasSql);
    return database.executar(totalCurtidasSql).then(results => {
        return results[0].totalCurtidas;
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
    toggleCurtida,
    atualizarTotalCurtidas
};
