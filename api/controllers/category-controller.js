const { sql } = require("../config/database");

const categories = async (req, res) => {
  const result = await sql`select * from categories`;

  res.json(result);
};

const createCategories = async (req, res) => {
  const { user_id, name, amount, transaction_type, description, category_id } =
    req.body;
  const response =
    await sql`insert into categories (user_id, name, amount, transaction_type, description, category_id) values(${user_id}, ${name}, ${amount}, ${transaction_type}, ${description}, ${category_id})`;

  res.json(response);
};

const updateCategories = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, avatar_img } = req.body;

  await sql`select * from categories`;

  res.json([{ writewas: "Successful" }]);
};

const deleteCategories = async (req, res) => {
  const { id } = req.params;

  await sql`select * from categories`;

  res.json([{ status: "succ" }]);
};

module.exports = {
  categories,
  createCategories,
  updateCategories,
  deleteCategories,
};
