import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low"
  },
  status: {
    type: String,
    enum: ["pending", "in progress", "completed"],
    default: "pending"
  }
})

export default mongoose.model("Task", taskSchema);