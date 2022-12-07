CREATE TABLE languages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    `language` TEXT NOT NULL
);

CREATE UNIQUE INDEX uq_idx_language_languages ON languages(`language`);

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    middle_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    username TEXT NOT NULL,
    `language` TEXT NOT NULL REFERENCES languages(`language`),
    created_at TIMESTAMP NOT NULL DEFAULT (DATETIME('now', '+9 hours')),
);

CREATE UNIQUE INDEX uq_idx_email_users ON users(email);

CREATE TABLE user_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id),
    `session` TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT (DATETIME('now', '+9 hours')),
);

CREATE UNIQUE INDEX uq_idx_session_user_sessions ON user_sessions(`session`);

CREATE TABLE user_preferred_languages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id),
    `language` TEXT NOT NULL REFERENCES languages(`language`)
);

CREATE UNIQUE INDEX uq_idx_user_id_language_user_preferred_languages ON user_preferred_languages(user_id, `language`);

CREATE TABLE objtxts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    `language` TEXT NOT NULL REFERENCES languages(`language`),
    sound_url TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT (DATETIME('now', '+9 hours')),
);

CREATE UNIQUE INDEX uq_idx_text_objtxts ON objtxts(text);

CREATE TABLE objects (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    original_ojbtxt_id INTEGER NOT NULL REFERENCES objtxts(id),
    bbox_ul_x NUMERIC,
    bbox_ul_y NUMERIC,
    bbox_ll_x NUMERIC,
    bbox_ll_y NUMERIC,
    bbox_lr_x NUMERIC,
    bbox_lr_y NUMERIC,
    bbox_ur_x NUMERIC,
    bbox_ur_y NUMERIC,
    image_url TEXT NOT NULL,
    country TEXT,
    city TEXT,
);

CREATE INDEX idx_user_id_objects ON objects(user_id);

CREATE TABLE object_translated_objtxts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    object_id TEXT NOT NULL REFERENCES objects(id),
    translated_objtxt_id INTEGER NOT NULL REFERENCES objtxts(id)
);

CREATE INDEX uq_idx_object_id_translated_objtxt_id_object_translated_objtxts ON object_translated_objtxts(object_id, translated_objtxt_id);
