const { sql } = require("../config/database");
const { v4: id } = require("uuid");

const transactions = async (req, res) => {
  const result = await sql`select * from transactions`;

  res.json(result);
};

const createTransaction = async (req, res) => {
  const {
    user_id,
    name,
    amount,
    transaction_type,
    desc,
    selectedOption,
    datetime,
  } = req.body;

  const real_amount = Number(amount);

  const response =
    await sql`insert into transactions (id, user_id, name, amount, transaction_type, description, category_id, created_at) values(${id()},${user_id}, ${name}, ${real_amount}, ${transaction_type}, ${desc}, ${
      selectedOption.value
    }, ${datetime})`;

  res.json(response);
};

const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { amount, name, datetime, desc, selectedOption } = req.body;

  const real_amount = Number(amount);

  await sql`update transactions set (amount, name, updated_at, description, category_id) = (${real_amount}, ${name}, ${datetime}, ${desc}, ${selectedOption.value}) where id = ${id}`;

  res.json([{ writewas: "Successful" }]);
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  await sql`delete from transactions where id = ${id}`;

  console.log(id);
  res.json([{ status: "succ" }]);
};

module.exports = {
  transactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
