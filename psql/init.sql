CREATE DATABASE intl;

\connect intl;

DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS module_names;
DROP TABLE IF EXISTS translations;

CREATE TABLE messages (
    id serial PRIMARY KEY,
    module_id integer NOT NULL,
    key VARCHAR(40) NOT NULL
);

CREATE TABLE module_names (
    id serial PRIMARY KEY,
    name VARCHAR(40) NOT NULL
);

CREATE TABLE translations (
    message_id INTEGER NOT NULL,
    lang char(3) NOT NULL,
    value text NULL,
    PRIMARY KEY (message_id, lang)
);
