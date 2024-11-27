import express from "express";
import taskRouter from "./routes/tasks.js";
import { connect } from "./db.js";
import mongoose from "mongoose";

await connect();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/tasks", taskRouter);

app.use((err, req, res, next) => {
  // Custom error handling for different types of errors
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ "error": "Validation error", details: err.message });
  }
  res.status(500).json({ error: err.message })
})


app.listen(port, () => console.log("Server started on port ", port))