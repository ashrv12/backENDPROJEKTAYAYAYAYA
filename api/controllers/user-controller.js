const { sql } = require("../config/database");

const users = async (req, res) => {
  const result = await sql`select * from users`;

  res.json(result);
};

const createUser = async (req, res) => {
  const { user_id, name, amount, transaction_type, description, category_id } =
    req.body;
  const response =
    await sql`insert into users (user_id, name, amount, transaction_type, description, category_id) values(${user_id}, ${name}, ${amount}, ${transaction_type}, ${description}, ${category_id})`;

  res.json(response);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, avatar_img } = req.body;

  await sql`select * from users`;

  res.json([{ writewas: "Successful" }]);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  await sql`select * from users`;

  res.json([{ status: "succ" }]);
};

module.exports = {
  users,
  createUser,
  updateUser,
  deleteUser,
};
