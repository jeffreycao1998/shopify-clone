INSERT INTO products (name, description, price, user_id)
VALUES ('Orange Circle', '- Picture of a solar flare', 1899, (SELECT id from users WHERE email = 'jeffreycao1998@hotmail.com'));

INSERT INTO products (name, description, price, user_id)
VALUES ('Work Pic', '- Rare picture of me working', 2399, (SELECT id from users WHERE email = 'jeffreycao1998@hotmail.com'));
