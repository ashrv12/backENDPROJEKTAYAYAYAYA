const { sql } = require("../config/database");

const dbUsername = "admin";
const dbPassword = "password123";

const login = async (req, res) => {
  const { email, pass } = req.body;

  if (email !== dbUsername) {
    res.sendStatus(401);
    return;
  }

  if (pass !== dbPassword) {
    res.sendStatus(401);
    return;
  }

  console.log({ email, pass });

  res.json(["Success"]);
};

module.exports = {
  login,
};
