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
    date,
    time,
  } = req.body;

  const real_amount = Number(amount);
  let datentime = date + " " + time;
  console.log(datentime);

  const response =
    await sql`insert into transactions (id, user_id, name, amount, transaction_type, description, category_id, created_at) values(${id()},${user_id}, ${name}, ${real_amount}, ${transaction_type}, ${desc}, ${
      selectedOption.value
    }, ${datentime})`;

  res.json(response);
};

const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, avatar_img } = req.body;

  await sql`select * from transactions`;

  res.json([{ writewas: "Successful" }]);
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  await sql`select * from transactions`;

  res.json([{ status: "succ" }]);
};

module.exports = {
  transactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
