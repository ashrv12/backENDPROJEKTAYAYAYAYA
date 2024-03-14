const { sql } = require("../config/database");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { email, pass } = req.body;

  const users = await sql`select * from users where email=${email}`;

  if (users.length === 0) {
    res.status(400).json({ message: "Username or password is incorrect." });
    return;
  }

  const user = users[0];
  if (!bcrypt.compareSync(pass, user.password)) {
    res.status(400).json({ message: "Username or password is incorrect." });
    return;
  }

  res.json({ message: "Login success." });
};

module.exports = {
  login,
};
