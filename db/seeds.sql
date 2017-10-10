DROP TABLE IF EXISTS funnyimages CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL
);

CREATE TABLE funnyimages (
  id SERIAL PRIMARY KEY,
  image VARCHAR,
  user_id INT REFERENCES users(id)
);

INSERT INTO users 
  (email, password_digest)
  VALUES
  ('tims', '$2a$10$lbgGOOc0ASpveWH2FTx0JOPLbrCrb8HAlXHdffEfxTqBZ5z09HaES');

INSERT INTO funnyimages 
  (image, user_id) 
VALUES 
('https://img.buzzfeed.com/buzzfeed-static/static/enhanced/web04/2011/9/6/15/enhanced-buzz-27690-1315338948-58.jpg?downsize=715:*&output-format=auto&output-quality=auto',(select id from users where email = 'kin')),
('https://nationalmarker.com/upload/products/SPD442RB.jpg',(select id from users where email = 'kin')),
('https://img.buzzfeed.com/buzzfeed-static/static/enhanced/web05/2011/9/6/15/enhanced-buzz-18847-1315339061-20.jpg?downsize=715:*&output-format=auto&output-quality=auto',(select id from users where email = 'kin')),
('https://img.buzzfeed.com/buzzfeed-static/static/enhanced/web04/2011/9/6/15/enhanced-buzz-27712-1315339076-59.jpg?downsize=715:*&output-format=auto&output-quality=auto',(select id from users where email = 'kin'));

