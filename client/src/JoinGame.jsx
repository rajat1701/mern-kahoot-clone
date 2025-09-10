import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JoinGame() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function join() {
    if (code && name) {
      navigate(`/play/${code}?name=${encodeURIComponent(name)}`);
    }
  }

  return (
    <div>
      <h2>Join Game</h2>
      <input placeholder="Room code" value={code} onChange={e=>setCode(e.target.value)} /><br />
      <input placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} /><br />
      <button onClick={join}>Join</button>
    </div>
  );
}