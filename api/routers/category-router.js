const express = require("express");

const {
  categories,
  createCategories,
  updateCategories,
  deleteCategories,
} = require("../controllers/category-controller");

const categoryRouter = express.Router();

categoryRouter.get("/", categories);
categoryRouter.post("/create", createCategories);
categoryRouter.put("/update/:id", updateCategories);
categoryRouter.delete("/delete/:id", deleteCategories);

module.exports = categoryRouter;
