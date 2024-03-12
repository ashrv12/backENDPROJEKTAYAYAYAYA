const express = require("express");

const {
  login,
  // createUser,
  // updateUser,
  // deleteUser,
} = require("../controllers/login-controller");

const loginRouter = express.Router();

userRouter.post("/", login);
// userRouter.get("/create", createUser);
// userRouter.put("/update/:id", updateUser);
// userRouter.delete("/delete/:id", deleteUser);

module.exports = loginRouter;
