import express from "express";
import Board from "../models/Board.js";
import protect from "../middleware/authMiddleware.js"; // ✅ middleware

const router = express.Router();

// ✅ Create board (with user)
router.post("/", protect, async (req, res) => {
  try {
    const board = new Board({
      title: req.body.title,
      user: req.user.id, // ✅ attach logged-in user
    });

    await board.save();
    res.json(board);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get only logged-in user's boards
router.get("/", protect, async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user.id }); // ✅ filter
    res.json(boards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete only own board
router.delete("/:id", protect, async (req, res) => {
  try {
    const board = await Board.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id, // ✅ ownership check
    });

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.json({ message: "Board deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;