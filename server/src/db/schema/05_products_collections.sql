DROP TABLE IF EXISTS products_collections CASCADE;

CREATE TABLE products_collections (
  -- FOREIGN KEYS
  product_id INTEGER REFERENCES products(id),
  collection_id INTEGER REFERENCES collections(id)
);