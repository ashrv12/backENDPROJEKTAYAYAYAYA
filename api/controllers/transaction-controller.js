const { sql } = require("../config/database");

const transactions = async (req, res) => {
  const result = await sql`select * from transactions`;

  res.json(result);
};

const createTransaction = async (req, res) => {
  const { title, desc } = req.body;
  await sql`insert into tasks(id,title,description) values(${Date.now()},${title},${desc})`;

  res.json([{ thewrite: "was successful" }]);
};

const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { title, desc } = req.body;

  await sql``;

  res.json([{ writewas: "Successful" }]);
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  const data = fs.readFileSync("articles.json", "utf8");
  const list = JSON.parse(data);

  const newList = list.filter((item) => item.id !== Number(id));

  fs.writeFileSync("articles.json", JSON.stringify(newList));
  res.json([{ status: "succ" }]);
};

module.exports = {
  transactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
