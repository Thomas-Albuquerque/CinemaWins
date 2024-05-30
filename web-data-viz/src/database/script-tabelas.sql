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

SELECT * FROM usuario;

SELECT * FROM quiz;

SELECT * FROM resposta;

INSERT INTO quiz VALUES 
(1, 'Conhecimentos Gerais');


SELECT * FROM usuario JOIN resposta ON fkUsuario = id;