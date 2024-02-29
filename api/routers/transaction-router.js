const express = require("express");

const {
  transactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transaction-controller");

const transactionRouter = express.Router();

taskRouter.get("/", transactions);
taskRouter.post("/create", createTransaction);
taskRouter.put("/update/:id", updateTransaction);
taskRouter.delete("/delete/:id", deleteTransaction);

module.exports = transactionRouter;
