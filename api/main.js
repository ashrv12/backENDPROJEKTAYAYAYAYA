const express = require("express");
var cors = require("cors");

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// app.js
const postgres = require("postgres");
require("dotenv").config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
PGDATABASE = decodeURIComponent(PGDATABASE);

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: "require",
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

async function getPgVersion() {
  const result = await sql`select version()`;
  console.log(result);
}

getPgVersion();
//
app.post("/create-user", async (req, res) => {
  const { name, email, password, avatar_img } = req.body;
  const response =
    await sql`insert into users (name, email, password, avatar_img) values( ${name}, ${email}, ${password}, ${avatar_img})`;

  res.json(response);
});
//
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
