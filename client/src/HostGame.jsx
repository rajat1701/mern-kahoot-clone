import { useState } from "react";
import { useSocket } from "./useSocket";
import { useNavigate } from "react-router-dom";

export default function HostGame() {
  const socket = useSocket();
  const [roomCode, setRoomCode] = useState(null);
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  function createRoom() {
    const quiz = {
      questions: [
        { text: "2+2?", choices: ["3","4","5"], correctIndex: 1, timeLimitSec: 10 },
        { text: "Capital of France?", choices: ["London","Paris","Rome"], correctIndex: 1, timeLimitSec: 10 }
      ]
    };
    socket.emit("host:create_room", { quiz });
    socket.on("host:room_created", ({ roomCode }) => {
      setRoomCode(roomCode);
      navigate("/host?room=" + roomCode);
    });
    socket.on("host:players_update", ({ players }) => setPlayers(players));
  }

  function nextQuestion() {
    socket.emit("host:next_question", { roomCode });
  }

  return (
    <div>
      {!roomCode ? (
        <button onClick={createRoom}>Create Room</button>
      ) : (
        <div>
          <h2>Room Code: {roomCode}</h2>
          <h3>Players</h3>
          <ul>{players.map((p,i)=><li key={i}>{p.name}</li>)}</ul>
          <button onClick={nextQuestion}>Start / Next Question</button>
        </div>
      )}
    </div>
  );
}