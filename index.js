import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import notesRouter from "./routes/notes.js";
import drawingsRoute from "./routes/drawings.js";



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/notes", notesRouter)
app.use("/api/drawings", drawingsRoute);

// connect MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.error(err));

app.get("/", (req, res) => {
  res.send("API Notes berjalan 🚀");
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
