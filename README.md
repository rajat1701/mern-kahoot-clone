# MERN Kahoot-style Clone (Starter)

A minimal end-to-end starter implementing a quiz hosting flow like Kahoot:
- Host creates a room for a quiz
- Players join via code
- Real-time questions, answers, and leaderboard updates via Socket.IO

## Quick Start

### 1) Server
```
cd server
npm install
# update .env if needed
npm run dev
```
Server on http://localhost:5000

### 2) Client
```
cd client
npm install
npm run dev
```
Client on http://localhost:5173

Login/register on the Host page, create/save a sample quiz, click **Host** to create a room.
Players go to **Join**, enter the room code + name, and wait for the host to start.

## Notes
- This is a starter; not production-ready. Add validation, persistence for live game state, admin tools, rate limiting, etc.
- Scoring: simple base + time bonus.
- Questions live in the quiz document; you can extend to media, images, etc.
