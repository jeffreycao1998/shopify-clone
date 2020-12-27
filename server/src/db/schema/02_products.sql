DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products (
  id  INTEGER PRIMARY KEY NOT NULL DEFAULT nextval('serial'),
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price TEXT NOT NULL,

  -- FOREIGN KEYS
  user_id INTEGER REFERENCES users(id)
);