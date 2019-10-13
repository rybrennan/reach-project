DROP DATABASE IF EXISTS board;

CREATE DATABASE board;

USE board;

CREATE TABLE players (
  player_id int NOT NULL AUTO_INCREMENT,
  player_name varchar(100),
  PRIMARY KEY (player_id)
) ENGINE=InnoDB;

CREATE TABLE scores (
  score_id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  score int NOT NULL,
  date varchar(20),
  FOREIGN KEY (user_id) REFERENCES players(player_id),
  PRIMARY KEY (score_id)
) ENGINE=InnoDB;


INSERT INTO players (player_name) VALUES ('Michelle');
INSERT INTO players (player_name) VALUES ('Ryan');
INSERT INTO players (player_name) VALUES ('Chris');
INSERT INTO players (player_name) VALUES ('Gene');



INSERT INTO scores (user_id, score, date) VALUES (2, 20, "10/01/2019");
INSERT INTO scores (user_id, score, date) VALUES (4, 10, "10/02/2019");
INSERT INTO scores (user_id, score, date) VALUES (1, 25, "10/03/2019");
INSERT INTO scores (user_id, score, date) VALUES (1, 5, "10/04/2019");
INSERT INTO scores (user_id, score, date) VALUES (3, 12, "10/05/2019");


