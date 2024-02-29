const express = require("express");
var cors = require("cors");
const { sql } = require("/config/database.js");

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// app.js

// add new user
app.post("/create-user", async (req, res) => {
  const { name, email, password, avatar_img } = req.body;
  const response =
    await sql`insert into users (name, email, password, avatar_img) values( ${name}, ${email}, ${password}, ${avatar_img})`;

  res.json(response);
});

// update user

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
