CREATE DATABASE CinemaWins;

USE CinemaWins;


CREATE TABLE usuario(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(80),
email VARCHAR(256),
senha CHAR(8)
);

CREATE TABLE quiz(
idQuiz INT PRIMARY KEY AUTO_INCREMENT,
nome varchar(45)
);

CREATE TABLE resposta(
idResposta INT auto_increment,
fkUsuario INT,
fkQuiz INT,
CONSTRAINT fkUsuarioResposta FOREIGN KEY (fkUsuario) REFERENCES usuario(id),
CONSTRAINT fkQuizResposta FOREIGN KEY (fkQuiz) REFERENCES quiz(idQuiz),
PRIMARY KEY (idResposta, fkUsuario, fkQuiz),
pontuacao INT
);

CREATE TABLE review (
    idReview INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT,
    foto VARCHAR(256),
    titulo VARCHAR(100),
    descricao VARCHAR(263),
    qtd_curtidas INT,
    data_publicacao DATETIME,
    CONSTRAINT fkUsuarioReview FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);

SELECT * FROM usuario;

SELECT * FROM review;

SELECT * FROM quiz;

SELECT usuario.nome  AS nome_Usuario
        FROM usuario WHERE id = 2;

SELECT * FROM resposta;

INSERT INTO quiz VALUES 
(1, 'Conhecimentos Gerais');

INSERT INTO quiz VALUES 
(2, ' Terror');

SELECT * FROM usuario JOIN resposta ON fkUsuario = id;

SELECT usuario.id, usuario.nome, usuario.email, COUNT(resposta.idResposta) AS total_jogadas
FROM usuario
LEFT JOIN resposta ON usuario.id = resposta.fkUsuario
GROUP BY usuario.id, usuario.nome, usuario.email;

SELECT usuario.nome, resposta.fkUsuario, MAX(resposta.pontuacao) AS maior_pontuacao
FROM resposta 
JOIN usuario ON resposta.fkUsuario = usuario.id
GROUP BY resposta.fkUsuario;

SELECT usuario.nome, resposta.fkUsuario, MIN(resposta.pontuacao) AS menor_pontuacao
FROM resposta 
JOIN usuario ON resposta.fkUsuario = usuario.id
GROUP BY resposta.fkUsuario;

SELECT usuario.id, usuario.nome, usuario.email, SUM(resposta.pontuacao) AS total_pontuacao
FROM usuario
JOIN resposta ON usuario.id = resposta.fkUsuario
GROUP BY usuario.id, usuario.nome, usuario.email;

SELECT usuario.id, usuario.nome, usuario.email, SUM(resposta.pontuacao) AS total_pontuacao
FROM usuario
JOIN resposta ON usuario.id = resposta.fkUsuario
GROUP BY usuario.id, usuario.nome, usuario.email
ORDER BY total_pontuacao DESC;

INSERT INTO review VALUES (DEFAULT, 3 , null, 'Meu filme favorito é Crespusculo, edai?', 'nem todos os filmes precisam ter um história super profunda',
 20, '2024-06-03 14:19:01');
 
 ALTER TABLE resposta 
ADD COLUMN acertos INT,
ADD COLUMN erros INT;

ALTER TABLE review
ADD COLUMN qtd_curtidas INT DEFAULT 0;

-- Criar a tabela 'curtidas'
-- CREATE TABLE curtidas (
--    idCurtida INT PRIMARY KEY AUTO_INCREMENT,
--    fkUsuario INT,
--    fkReview INT,
--    CONSTRAINT fkUsuarioCurtida FOREIGN KEY (fkUsuario) REFERENCES usuario(id),
--    CONSTRAINT fkReviewCurtida FOREIGN KEY (fkReview) REFERENCES review(idReview)
-- );
ALTER TABLE resposta
MODIFY COLUMN pontuacao INT DEFAULT 0;

SELECT * FROM curtidas;