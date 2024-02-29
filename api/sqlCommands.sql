CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(50) UNIQUE NOT NULL,
  password TEXT,
  avatar_img TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  currency_type TEXT DEFAULT 'MNT'
)


CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id SERIAL PRIMARY KEY,
  name TEXT,
  amount REAL NOT NULL,
  transaction_type  AS ENUM ('INC', 'EXP'),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  category_id SERIAL PRIMARY KEY
);

insert into users (name, email, password, avatar_img) values(${name},${email},${password}, $(avatar_img))