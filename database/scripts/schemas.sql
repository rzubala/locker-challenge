CREATE SCHEMA IF NOT EXISTS main;

CREATE TABLE IF NOT EXISTS main.player (
	id_player int PRIMARY KEY,
    name varchar(64) NOT NULL
);

CREATE INDEX IF NOT EXISTS player_name ON main.player (name);

CREATE TABLE IF NOT EXISTS main.event (
	id_event int PRIMARY KEY,
    name text NOT NULL
);

CREATE TABLE IF NOT EXISTS main.player_event_result (
    player_id int NOT NULL,
    event_id int NOT NULL,
    total_score varchar(4),
    position varchar(4),
    position_id int,
    total_strikes int,
    PRIMARY KEY(event_id, player_id),
    CONSTRAINT player_fk FOREIGN KEY (player_id) REFERENCES main.player (id_player) MATCH FULL,
    CONSTRAINT event_fk FOREIGN KEY (event_id) REFERENCES main.event (id_event) MATCH FULL
);

CREATE TABLE IF NOT EXISTS main.player_event_result_round (
    player_id int NOT NULL,
    event_id int NOT NULL,
    round int NOT NULL,
    score varchar(4),
    strikes int,
    PRIMARY KEY(event_id, player_id, round),
    CONSTRAINT player_fk FOREIGN KEY (player_id) REFERENCES main.player (id_player) MATCH FULL,
    CONSTRAINT event_fk FOREIGN KEY (event_id) REFERENCES main.event (id_event) MATCH FULL
);

