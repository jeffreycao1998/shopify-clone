DROP TABLE IF EXISTS collections CASCADE;

CREATE TABLE collections (
  id  INTEGER PRIMARY KEY NOT NULL DEFAULT nextval('serial'),
  name VARCHAR(255) NOT NULL,
  active BOOLEAN,

  -- FOREIGN KEYS
  user_id INTEGER REFERENCES users(id)
);