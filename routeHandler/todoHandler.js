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

// POST multipal todo
router.post("/all", async (req, res) => {
  try {
    await Todo.insertMany(req.body);
    res.status(201).json({ message: "Todo were created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT Todo
router.put("/:id", async (req, res) => {
  try {
    const result = await Todo.updateOne(
      { _id: req.params.id },
      { $set: { status: "inactive" } }
    );
    if (result.nModified === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json({ MESSAGE: "Todo was updated successfully!" });
  } catch (err) {
    console.error("Error updating Todo:", err);
    res.status(500).json({ error: "There was a server side error!" });
  }
});


//Delete todo
router.delete("/:id", async (req, res) => {});

module.exports = router;
