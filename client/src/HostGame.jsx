// import { useState } from "react";
// import { useSocket } from "./useSocket";
// import { useNavigate } from "react-router-dom";

// export default function HostGame() {
//   const socket = useSocket();
//   const [roomCode, setRoomCode] = useState(null);
//   const [players, setPlayers] = useState([]);
//   const navigate = useNavigate();

//   function createRoom() {
//     const quiz = {
//       questions: [
//         { text: "2+2?", choices: ["3","4","5"], correctIndex: 1, timeLimitSec: 10 },
//         { text: "Capital of France?", choices: ["London","Paris","Rome"], correctIndex: 1, timeLimitSec: 10 }
//       ]
//     };
//     socket.emit("host:create_room", { quiz });
//     socket.on("host:room_created", ({ roomCode }) => {
//       setRoomCode(roomCode);
//       navigate("/host?room=" + roomCode);
//     });
//     socket.on("host:players_update", ({ players }) => setPlayers(players));
//   }

//   function nextQuestion() {
//     socket.emit("host:next_question", { roomCode });
//   }

//   return (
//     <div>
//       {!roomCode ? (
//         <button onClick={createRoom}>Create Room</button>
//       ) : (
//         <div>
//           <h2>Room Code: {roomCode}</h2>
//           <h3>Players</h3>
//           <ul>{players.map((p,i)=><li key={i}>{p.name}</li>)}</ul>
//           <button onClick={nextQuestion}>Start / Next Question</button>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState } from "react";
import { useSocket } from "./useSocket";
import { useNavigate } from "react-router-dom";
import QuizEditor from "./QuizEditor"; // Import the new component

export default function HostGame() {
  const socket = useSocket();
  const [roomCode, setRoomCode] = useState(null);
  const [players, setPlayers] = useState([]);
  const [quizCreated, setQuizCreated] = useState(false);
  const navigate = useNavigate();

  // Function to create a room with a specific quiz object
  function createRoom(quiz) {
    socket.emit("host:create_room", { quiz });
    socket.on("host:room_created", ({ roomCode }) => {
      setRoomCode(roomCode);
      setQuizCreated(true);
      navigate("/host?room=" + roomCode);
    });
    socket.on("host:players_update", ({ players }) => setPlayers(players));
  }

  // Use the pre-defined sample quiz
  function useSampleQuiz() {
    const sampleQuiz = {
      questions: [
        { text: "2+2?", choices: ["3", "4", "5"], correctIndex: 1, timeLimitSec: 10 },
        { text: "Capital of France?", choices: ["London", "Paris", "Rome"], correctIndex: 1, timeLimitSec: 10 },
      ],
    };
    createRoom(sampleQuiz);
  }

  function nextQuestion() {
    socket.emit("host:next_question", { roomCode });
  }

  if (roomCode) {
    // Already in a room
    return (
      <div>
        <h2>Room Code: {roomCode}</h2>
        <h3>Players</h3>
        <ul>
          {players.map((p, i) => (
            <li key={i}>{p.name}</li>
          ))}
        </ul>
        <button onClick={nextQuestion}>Start / Next Question</button>
      </div>
    );
  }

  // Not in a room, show options to create one
  return (
    <div>
      {!quizCreated ? (
        <>
          <h2>Create or Use Sample Quiz</h2>
          <button onClick={useSampleQuiz}>Use Sample Quiz</button>
          <hr />
          <QuizEditor onSave={createRoom} />
        </>
      ) : (
        <p>Creating room...</p> // This state is short-lived as navigation happens quickly
      )}
    </div>
  );
}