const express = require("express");

const {
  users,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user-controller");

const userRouter = express.Router();

userRouter.get("/", users);
userRouter.post("/create", createUser);
userRouter.put("/update/:id", updateUser);
userRouter.delete("/delete/:id", deleteUser);

module.exports = userRouter;
