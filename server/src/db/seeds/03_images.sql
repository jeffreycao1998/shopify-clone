INSERT INTO images (image_url, product_id)
VALUES ('https://cdn.eso.org/images/screen/eso1907a.jpg', (SELECT id FROM products WHERE description = '- Picture of a solar flare'));

INSERT INTO images (image_url, product_id)
VALUES ('https://i.imgur.com/GulDsUS.jpg', (SELECT id FROM products WHERE description = '- Rare picture of me working'));
