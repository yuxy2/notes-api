import express from "express";
import Note from "../models/note.js";

const router = express.Router();

// GET semua notes
router.get("/", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

// POST buat note baru
router.post("/", async (req, res) => {
  const { title, content, tags } = req.body;
  const newNote = new Note({ title, content, tags });
  await newNote.save();
  res.json(newNote);
});

// PUT update note
router.put("/:id", async (req, res) => {
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedNote);
});

// DELETE hapus note
router.delete("/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
});

// GET /api/notes/search?q=keyword
router.get("/search", async (req, res) => {
  const { q } = req.query;
  const notes = await Note.find({
    $or: [
      { title: { $regex: q, $options: "i" } },
      { content: { $regex: q, $options: "i" } }
    ]
  });
  res.json(notes);
});

// GET /api/notes/tag/:tag
router.get("/tag/:tag", async (req, res) => {
  const notes = await Note.find({ tags: req.params.tag });
  res.json(notes);
});

// GET /api/notes?page=1&limit=5
router.get("/", async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const notes = await Note.find()
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 }); // terbaru dulu

  const total = await Note.countDocuments();

  res.json({
    total,
    page: Number(page),
    limit: Number(limit),
    notes
  });
});

// GET /api/notes/sort?order=asc|desc
router.get("/sort", async (req, res) => {
  const { order = "desc" } = req.query;
  const notes = await Note.find().sort({ createdAt: order === "asc" ? 1 : -1 });
  res.json(notes);
});



export default router;
