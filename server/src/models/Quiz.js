import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  choices: [{ type: String, required: true }],
  correctIndex: { type: Number, required: true },
  timeLimitSec: { type: Number, default: 20 },
}, { _id: false });

const quizSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: String,
  questions: [questionSchema],
}, { timestamps: true });

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
