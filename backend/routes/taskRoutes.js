import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// Create task
router.post("/", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

// Get tasks by board
router.get("/:boardId", async (req, res) => {
  const tasks = await Task.find({ boardId: req.params.boardId });
  res.json(tasks);
});

// Update task (drag)
router.put("/:id", async (req, res) => {
  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// Delete task
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;