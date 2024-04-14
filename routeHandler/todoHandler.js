const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

//GET all the todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sarver error" });
  }
});

//Get a Todo by Id
router.get("/:id", async (req, res) => {});

//POST a Todo
router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res
      .status(201)
      .json({ message: "Todo created successfully", todo: newTodo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

//POST mulriple Todo
router.post("alll", async (req, res) => {});

//PUT Todo
router.put("/:id", async (req, res) => {});

//Delete todo
router.delete("/:id", async (req, res) => {});

module.exports = router;
