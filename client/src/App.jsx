import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import HostGame from "./HostGame";
import JoinGame from "./JoinGame";
import PlayerGame from "./PlayerGame";

export default function App() {
  return (
    <BrowserRouter>
      <h1>Kahoot Clone</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/host" element={<HostGame />} />
        <Route path="/join" element={<JoinGame />} />
        <Route path="/play/:code" element={<PlayerGame />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div>
      <h2>Welcome</h2>
      <Link to="/host">Host a game</Link><br />
      <Link to="/join">Join a game</Link>
    </div>
  );
}