import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Join() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const nav = useNavigate();

  function go() {
    if (name && room) nav(`/play/${room}?name=${encodeURIComponent(name)}`);
  }

  return (
    <div>
      <h2>Join a game</h2>
      <input placeholder="room code" onChange={e=>setRoom(e.target.value.toUpperCase())} />
      <input placeholder="your name" onChange={e=>setName(e.target.value)} />
      <button onClick={go}>Join</button>
    </div>
  )
}
