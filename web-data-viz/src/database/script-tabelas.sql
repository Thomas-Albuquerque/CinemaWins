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
    data_publicacao DATETIME,
    CONSTRAINT fkUsuarioReview FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);

SELECT * FROM usuario;

SELECT * FROM quiz;

SELECT * FROM resposta;

INSERT INTO quiz VALUES 
(1, 'Conhecimentos Gerais');


SELECT * FROM usuario JOIN resposta ON fkUsuario = id;