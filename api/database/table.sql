CREATE TABLE categories(
  id varchar(21) PRIMARY KEY,
  name VARCHAR(100),
  description text,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  category_image text
)

insert into categories(id, name, description, category_image) values('home','Home', 'Home related transaction', 'home')
insert into categories(id, name, description, category_image) values('gift','Gift', 'Gift related transaction', 'gift')
insert into categories(id, name, description, category_image) values('food','Food', 'Food related transaction', 'food')
insert into categories(id, name, description, category_image) values('drink','Drink', 'Drink related transaction', 'drink')
insert into categories(id, name, description, category_image) values('transport','Transport', 'Transport related transaction', 'transport')
insert into categories(id, name, description, category_image) values('shop','Shopping', 'Shopping related transaction', 'shopping')

CREATE TABLE users (
  user_id VARCHAR(21) PRIMARY KEY,
  email VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(50) UNIQUE NOT NULL,
  password TEXT,
  avatar_img TEXT,
  created_at TIMESTAMP default current_timestamp,
  updated_at TIMESTAMP default current_timestamp,
  currency_type TEXT DEFAULT 'MNT'
)

insert into users(user_id, email, name, password) values('admin', 'admin@tragic.com', 'lil admin', 'yungadmin123')

create type transaction as enum('EXP', 'INC');
create table transactions(
    id VARCHAR(21) PRIMARY KEY,
    amount MONEY,
    name VARCHAR(55),
    created_at TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    transaction_type transaction,
    description text,
    category_id VARCHAR(21),
    constraint fk_category FOREIGN KEY (category_id) REFERENCES categories (id),
    user_id VARCHAR(21),
    constraint fk_user FOREIGN KEY (user_id) REFERENCES users (user_id)
)

insert into transactions(id, amount, name, created_at, transaction_type, description, category_id, user_id)

insert into transactions(id,amount,name,transaction_type,description,category_id,user_id) values('asd123',250000,'Car','EXP','Travesty in the aisles','transport','admin')

insert into categories VALUES('1', 'Food and Drinks')
insert into categories VALUES('2', 'Shopping')
insert into categories VALUES('3', 'Housing')
insert into categories(id, name) VALUES('3', 'Housing')


insert into transactions(id, amount, category_id) values('10', 10000, '2')
-- bottom code wont work because of the correlation
insert into transactions(id, amount, category_id) values('15', 10000, '4')

select transactions.id, amount, category_id, categories.name category_name from transactions left join categories on transactions.category_id = categories.id