import mongoose from "mongoose";

const drawingSchema = new mongoose.Schema(
  {
    elements: { type: Array, required: true }, // simpan JSON array
  },
  { timestamps: true }
);

const Drawing = mongoose.model("Drawing", drawingSchema);
export default Drawing;
