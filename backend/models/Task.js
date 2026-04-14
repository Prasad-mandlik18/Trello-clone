import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  status: {
    type: String,
    enum: ["todo", "doing", "done"],
    default: "todo",
  },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
  },
});

export default mongoose.model("Task", taskSchema);