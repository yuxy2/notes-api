import express from "express";
import Drawing from "../models/drawing.js";

const router = express.Router();

// simpan gambar
router.post("/", async (req, res) => {
  try {
    const drawing = new Drawing(req.body);
    await drawing.save();
    res.json(drawing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ambil gambar
router.get("/:id", async (req, res) => {
  try {
    const drawing = await Drawing.findById(req.params.id);
    if (!drawing) return res.status(404).json({ error: "Not found" });
    res.json(drawing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
