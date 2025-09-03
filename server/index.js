import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRouter from "./src/routes/auth.js";
import quizRouter from "./src/routes/quizzes.js";
import { initGameSockets } from "./src/sockets/game.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true
  }
});

// Basic middleware
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Connect DB
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo error:", err.message));

// Routes
app.get("/", (req, res) => res.json({ status: "ok", service: "kahoot-clone-server" }));
app.use("/api/auth", authRouter);
app.use("/api/quizzes", quizRouter);

// Sockets
initGameSockets(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
