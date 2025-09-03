import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSocket } from "../components/useSocket";

export default function HostGame() {
  const { code } = useParams();
  const socket = useSocket();
  const [players, setPlayers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const onPlayers = (payload) => setPlayers(payload.players || []);
    const onBoard = (board) => setLeaderboard(board);
    const onStart = (q) => setQuestion(q);
    const onEnd = (p) => setQuestion(null);

    socket.on("host:players_update", onPlayers);
    socket.on("host:leaderboard", onBoard);
    socket.on("question:start", onStart);
    socket.on("question:end", onEnd);

    return () => {
      socket.off("host:players_update", onPlayers);
      socket.off("host:leaderboard", onBoard);
      socket.off("question:start", onStart);
      socket.off("question:end", onEnd);
    }
  }, [socket]);

  function nextQ() {
    socket.emit("host:next_question", { roomCode: code });
  }

  return (
    <div>
      <h2>Host Room: {code}</h2>
      <p>Share this code with players. They should open the Join tab.</p>
      <button onClick={nextQ}>{question ? "Next Question" : "Start Game"}</button>
      <h3>Players ({players.length})</h3>
      <ul>{players.map((p,i)=>(<li key={i}>{p.name} — {p.score}</li>))}</ul>
      <h3>Leaderboard</h3>
      <ol>{leaderboard.map((p,i)=>(<li key={i}>{p.name} — {p.score}</li>))}</ol>
      {question && (
        <div style={{ border: "1px solid #ddd", padding: 12, marginTop: 12 }}>
          <h3>Q: {question.text}</h3>
          <ul>{question.choices.map((c,i)=>(<li key={i}>{i+1}. {c}</li>))}</ul>
        </div>
      )}
      <p><Link to="/">Back</Link></p>
    </div>
  )
}
