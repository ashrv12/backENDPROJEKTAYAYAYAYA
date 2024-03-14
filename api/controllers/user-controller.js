const { sql } = require("../config/database");
const { v4: id } = require("uuid");
const bcrypt = require("bcryptjs");

const users = async (req, res) => {
  const result = await sql`select * from users`;

  res.json(result);
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const users = await sql`select * from users where email=${email}`;

  if (users.length > 0) {
    res.status(400).json({ message: "Email is already in use." });
    return;
  } else {
    const hash = bcrypt.hashSync(password, 8);
    await sql`insert into users (user_id, name, email, password) values(${id()}, ${name}, ${email}, ${hash})`;

    res.json({ message: "Successfully registered" });
  }
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
