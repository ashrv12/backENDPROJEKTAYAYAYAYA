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


CREATE TYPE transaction_type_enum AS ENUM ('INC', 'EXP');

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  name TEXT,
  amount REAL NOT NULL,
  transaction_type transaction_type_enum,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  category_id INTEGER
);

insert into users (name, email, password, avatar_img) values(${name},${email},${password}, $(avatar_img))

insert into transactions (user_id, name, amount, transaction_type, description, category_id) values(${user_id},${name},${amount}, ${transaction_type}, ${description}, ${category_id})