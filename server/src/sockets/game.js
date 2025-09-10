import { randomUUID } from "crypto";

const rooms = new Map();

export function initGameSockets(io) {
  io.on("connection", (socket) => {
    console.log("✅ Socket connected:", socket.id);

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

    socket.on("player:join", ({ roomCode, name }) => {
      const room = rooms.get(roomCode);
      if (!room) return io.to(socket.id).emit("error", { message: "Room not found" });
      room.players.set(socket.id, { name, score: 0, answered: false });
      socket.join(roomCode);
      io.to(roomCode).emit("host:players_update", { players: Array.from(room.players.values()) });
      io.to(roomCode).emit("lobby:update", { count: room.players.size });
    });

    socket.on("host:next_question", ({ roomCode }) => {
      const room = rooms.get(roomCode);
      if (!room || socket.id !== room.hostId) return;
      room.currentQ += 1;
      if (room.currentQ >= room.quiz.questions.length) {
        const leaderboard = makeLeaderboard(room);
        io.to(roomCode).emit("game:over", { leaderboard });
        return;
      }
      const q = room.quiz.questions[room.currentQ];
      for (const p of room.players.values()) p.answered = false;
      const now = Date.now();
      room.endsAt = now + (q.timeLimitSec || 20) * 1000;
      io.to(roomCode).emit("question:start", {
        index: room.currentQ,
        text: q.text,
        choices: q.choices,
        endsAt: room.endsAt
      });
      setTimeout(() => endQuestion(io, roomCode), (q.timeLimitSec || 20) * 1000 + 200);
    });

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
        const bonus = Math.floor(timeLeftMs / 50);
        player.score += 1000 + bonus;
      }
      io.to(socket.id).emit("player:answer_result", { correct });
      io.to(room.hostId).emit("host:leaderboard", makeLeaderboard(room));
    });

    socket.on("disconnect", () => {
      for (const [code, room] of rooms.entries()) {
        if (room.hostId === socket.id) {
          rooms.delete(code);
          io.to(code).emit("game:closed");
        } else if (room.players.has(socket.id)) {
          room.players.delete(socket.id);
          io.to(code).emit("host:players_update", { players: Array.from(room.players.values()) });
        }
      }
    });
  });
}

function endQuestion(io, roomCode) {
  const room = rooms.get(roomCode);
  if (!room) return;
  const q = room.quiz.questions[room.currentQ];
  io.to(roomCode).emit("question:end", { correctIndex: q.correctIndex, leaderboard: makeLeaderboard(room) });
}

function makeLeaderboard(room) {
  return Array.from(room.players.values())
    .map(p => ({ name: p.name, score: p.score }))
    .sort((a,b)=>b.score-a.score);
}