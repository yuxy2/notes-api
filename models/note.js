import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [String],
}, { timestamps: true }); // otomatis ada createdAt & updatedAt

export default mongoose.model("Note", noteSchema);
