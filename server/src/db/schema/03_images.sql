DROP TABLE IF EXISTS images CASCADE;

CREATE TABLE images (
  id  INTEGER PRIMARY KEY NOT NULL DEFAULT nextval('serial'),
  image_url TEXT,

  -- FOREIGN KEYS
  product_id INTEGER REFERENCES products(id)
);