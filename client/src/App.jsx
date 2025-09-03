import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Host from './pages/Host.jsx'
import Join from './pages/Join.jsx'
import HostGame from './pages/HostGame.jsx'
import PlayerGame from './pages/PlayerGame.jsx'

export default function App() {
  return (
    <div style={{ fontFamily: "system-ui", padding: 16 }}>
      <header style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <h1 style={{ marginRight: "auto" }}>Kahoot Clone</h1>
        <Link to="/">Host</Link>
        <Link to="/join">Join</Link>
      </header>
      <Routes>
        <Route path="/" element={<Host />} />
        <Route path="/join" element={<Join />} />
        <Route path="/host/:code" element={<HostGame />} />
        <Route path="/play/:code" element={<PlayerGame />} />
      </Routes>
    </div>
  )
}
