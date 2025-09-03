import { Router } from "express";
import Quiz from "../models/Quiz.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();

// Create
router.post("/", authRequired, async (req, res) => {
  try {
    const quiz = new Quiz({ ...req.body, ownerId: req.user.sub });
    await quiz.save();
    res.json(quiz);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// My quizzes
router.get("/mine", authRequired, async (req, res) => {
  const quizzes = await Quiz.find({ ownerId: req.user.sub }).sort("-createdAt");
  res.json(quizzes);
});

// Read one
router.get("/:id", authRequired, async (req, res) => {
  const quiz = await Quiz.findOne({ _id: req.params.id, ownerId: req.user.sub });
  if (!quiz) return res.status(404).json({ error: "Not found" });
  res.json(quiz);
});

// Update
router.put("/:id", authRequired, async (req, res) => {
  const quiz = await Quiz.findOneAndUpdate(
    { _id: req.params.id, ownerId: req.user.sub },
    req.body,
    { new: true }
  );
  if (!quiz) return res.status(404).json({ error: "Not found" });
  res.json(quiz);
});

// Delete
router.delete("/:id", authRequired, async (req, res) => {
  const result = await Quiz.deleteOne({ _id: req.params.id, ownerId: req.user.sub });
  res.json({ deletedCount: result.deletedCount });
});

export default router;
