// Super lightweight game loop using Socket.IO and in-memory state.
// For production, move to Redis or Mongo-backed ephemeral store.
import { randomUUID } from "crypto";

const rooms = new Map(); // roomCode -> { hostId, quiz, players: Map(socketId->{name,score}), currentQ, endsAt }

export function initGameSockets(io) {
  io.on("connection", (socket) => {
    // Host creates a room with selected quiz
    socket.on("host:create_room", ({ quiz }) => {
      const roomCode = (Math.random().toString(36).slice(2, 6)).toUpperCase();
      rooms.set(roomCode, {
        hostId: socket.id,
        quiz,
        players: new Map(),
        currentQ: -1,
        endsAt: null
      });
      socket.join(roomCode);
      io.to(socket.id).emit("host:room_created", { roomCode });
      console.log("Room created", roomCode);
    });

    // Player joins by code
    socket.on("player:join", ({ roomCode, name }) => {
      const room = rooms.get(roomCode);
      if (!room) return io.to(socket.id).emit("error", { message: "Room not found" });
      room.players.set(socket.id, { name, score: 0, answered: false });
      socket.join(roomCode);
      io.to(room.hostId).emit("host:players_update", { players: Array.from(room.players.values()) });
      io.to(roomCode).emit("lobby:update", { count: room.players.size });
    });

    // Host starts next question
    socket.on("host:next_question", ({ roomCode }) => {
      const room = rooms.get(roomCode);
      if (!room || socket.id !== room.hostId) return;
      room.currentQ += 1;
      if (room.currentQ >= room.quiz.questions.length) {
        // game over
        const leaderboard = Array.from(room.players.values())
          .map(p => ({ name: p.name, score: p.score }))
          .sort((a,b)=>b.score-a.score);
        io.to(roomCode).emit("game:over", { leaderboard });
        return;
      }
      const q = room.quiz.questions[room.currentQ];
      // reset answered flags
      for (const p of room.players.values()) p.answered = false;
      const now = Date.now();
      room.endsAt = now + (q.timeLimitSec || 20) * 1000;
      io.to(roomCode).emit("question:start", {
        index: room.currentQ,
        text: q.text,
        choices: q.choices,
        endsAt: room.endsAt
      });
      // End question after timer
      setTimeout(() => endQuestion(io, roomCode), (q.timeLimitSec || 20) * 1000 + 200);
    });

    // Player submits answer
    socket.on("player:answer", ({ roomCode, choiceIndex }) => {
      const room = rooms.get(roomCode);
      if (!room) return;
      const q = room.quiz.questions[room.currentQ];
      const player = room.players.get(socket.id);
      if (!player || player.answered) return;
      player.answered = true;
      const timeLeftMs = Math.max(0, room.endsAt - Date.now());
      const correct = choiceIndex === q.correctIndex;
      if (correct) {
        // simple scoring: base 1000 + time bonus
        const bonus = Math.floor(timeLeftMs / 50);
        player.score += 1000 + bonus;
      }
      io.to(socket.id).emit("player:answer_result", { correct });
      // live leaderboard tick
      const board = makeLeaderboard(room);
      io.to(room.hostId).emit("host:leaderboard", board);
    });

    socket.on("disconnect", () => {
      // Clean player from any rooms
      for (const [code, room] of rooms.entries()) {
        if (room.hostId === socket.id) {
          rooms.delete(code);
          io.to(code).emit("game:closed");
        } else if (room.players.has(socket.id)) {
          room.players.delete(socket.id);
          io.to(room.hostId).emit("host:players_update", { players: Array.from(room.players.values()) });
        }
      }
    });
  });
}

function endQuestion(io, roomCode) {
  const room = rooms.get(roomCode);
  if (!room) return;
  const q = room.quiz.questions[room.currentQ];
  const leaderboard = makeLeaderboard(room);
  io.to(roomCode).emit("question:end", { correctIndex: q.correctIndex, leaderboard });
}

function makeLeaderboard(room) {
  return Array.from(room.players.values())
    .map(p => ({ name: p.name, score: p.score }))
    .sort((a,b)=>b.score-a.score);
}
