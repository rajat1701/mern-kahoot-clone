// import React, { useEffect, useMemo, useState } from "react";
// import { useParams, useSearchParams, Link } from "react-router-dom";
// import { useSocket } from "../components/useSocket";

// export default function PlayerGame() {
//   const { code } = useParams();
//   const [params] = useSearchParams();
//   const name = useMemo(()=>params.get("name") || "Player", [params]);
//   const socket = useSocket();
//   const [state, setState] = useState({ phase: "lobby" });
//   const [answerIdx, setAnswerIdx] = useState(null);
//   const [result, setResult] = useState(null);
//   const [timer, setTimer] = useState(0);

//   useEffect(() => {
//     socket.emit("player:join", { roomCode: code, name });
//     const onLobby = ({ count }) => setState({ phase: "lobby", count });
//     const onStart = (q) => {
//       setState({ phase: "question", q });
//       setAnswerIdx(null);
//       setResult(null);
//       const ms = q.endsAt - Date.now();
//       setTimer(Math.ceil(ms/1000));
//     };
//     const onTick = setInterval(() => {
//       setTimer(t => Math.max(0, t-1));
//     }, 1000);
//     const onEnd = ({ correctIndex, leaderboard }) => {
//       setState({ phase: "reveal", correctIndex, leaderboard });
//     };
//     const onOver = ({ leaderboard }) => {
//       setState({ phase: "over", leaderboard });
//     };
//     const onAnswerRes = ({ correct }) => setResult(correct ? "Correct!" : "Wrong");

//     socket.on("lobby:update", onLobby);
//     socket.on("question:start", onStart);
//     socket.on("question:end", onEnd);
//     socket.on("game:over", onOver);
//     socket.on("player:answer_result", onAnswerRes);

//     return () => {
//       clearInterval(onTick);
//       socket.off("lobby:update", onLobby);
//       socket.off("question:start", onStart);
//       socket.off("question:end", onEnd);
//       socket.off("game:over", onOver);
//       socket.off("player:answer_result", onAnswerRes);
//     }
//   }, [socket, code, name]);

//   function answer(i) {
//     setAnswerIdx(i);
//     socket.emit("player:answer", { roomCode: code, choiceIndex: i });
//   }

//   return (
//     <div>
//       <h2>Room: {code}</h2>
//       {state.phase === "lobby" && <p>Waiting for host to start... Players: {state.count || 1}</p>}

//       {state.phase === "question" && (
//         <div>
//           <h3>{state.q.text}</h3>
//           <p>Time left: {timer}s</p>
//           {state.q.choices.map((c,i)=>(
//             <button key={i} disabled={answerIdx !== null} onClick={()=>answer(i)} style={{ display:"block", margin:"8px 0" }}>
//               {c}
//             </button>
//           ))}
//           {result && <p>{result}</p>}
//         </div>
//       )}

//       {state.phase === "reveal" && (
//         <div>
//           <h3>Correct answer: {state.correctIndex + 1}</h3>
//           <h4>Leaderboard</h4>
//           <ol>{state.leaderboard.map((p,i)=>(<li key={i}>{p.name} — {p.score}</li>))}</ol>
//         </div>
//       )}

//       {state.phase === "over" && (
//         <div>
//           <h3>Game over</h3>
//           <ol>{state.leaderboard.map((p,i)=>(<li key={i}>{p.name} — {p.score}</li>))}</ol>
//           <p><Link to="/join">Join another</Link></p>
//         </div>
//       )}
//     </div>
//   )
// }


// import React, { useEffect, useMemo, useState } from "react";
// import { useParams, useSearchParams, Link } from "react-router-dom";
// import { useSocket } from "../components/useSocket";

// export default function PlayerGame() {
//   const { code } = useParams();
//   const [params] = useSearchParams();
//   const name = useMemo(() => params.get("name") || "Player", [params]);
//   const socket = useSocket();
//   const [state, setState] = useState({ phase: "lobby" });
//   const [answerIdx, setAnswerIdx] = useState(null);
//   const [result, setResult] = useState(null);
//   const [timer, setTimer] = useState(0);

//   useEffect(() => {
//     if (!socket) return; // wait until socket is ready

//     // Join room
//     socket.emit("player:join", { roomCode: code, name });

//     // Timer interval ref
//     let interval;

//     // Event handlers
//     const onLobby = ({ count }) => setState({ phase: "lobby", count });
//     const onStart = (q) => {
//       setState({ phase: "question", q });
//       setAnswerIdx(null);
//       setResult(null);
//       const ms = q.endsAt - Date.now();
//       setTimer(Math.ceil(ms / 1000));

//       // Start countdown
//       clearInterval(interval);
//       interval = setInterval(() => {
//         setTimer((t) => Math.max(0, t - 1));
//       }, 1000);
//     };
//     const onEnd = ({ correctIndex, leaderboard }) => {
//       setState({ phase: "reveal", correctIndex, leaderboard });
//       clearInterval(interval);
//     };
//     const onOver = ({ leaderboard }) => {
//       setState({ phase: "over", leaderboard });
//       clearInterval(interval);
//     };
//     const onAnswerRes = ({ correct }) => setResult(correct ? "Correct!" : "Wrong");

//     // Register socket events
//     socket.on("lobby:update", onLobby);
//     socket.on("question:start", onStart);
//     socket.on("question:end", onEnd);
//     socket.on("game:over", onOver);
//     socket.on("player:answer_result", onAnswerRes);

//     // Cleanup
//     return () => {
//       clearInterval(interval);
//       socket.off("lobby:update", onLobby);
//       socket.off("question:start", onStart);
//       socket.off("question:end", onEnd);
//       socket.off("game:over", onOver);
//       socket.off("player:answer_result", onAnswerRes);
//     };
//   }, [socket, code, name]);

//   const answer = (i) => {
//     setAnswerIdx(i);
//     if (socket) socket.emit("player:answer", { roomCode: code, choiceIndex: i });
//   };

//   // Show connecting state if socket not ready
//   if (!socket) return <p>Connecting to server...</p>;

//   return (
//     <div>
//       <h2>Room: {code}</h2>

//       {state.phase === "lobby" && (
//         <p>Waiting for host to start... Players: {state.count || 1}</p>
//       )}

//       {state.phase === "question" && (
//         <div>
//           <h3>{state.q.text}</h3>
//           <p>Time left: {timer}s</p>
//           {state.q.choices.map((c, i) => (
//             <button
//               key={i}
//               disabled={answerIdx !== null}
//               onClick={() => answer(i)}
//               style={{ display: "block", margin: "8px 0" }}
//             >
//               {c}
//             </button>
//           ))}
//           {result && <p>{result}</p>}
//         </div>
//       )}

//       {state.phase === "reveal" && (
//         <div>
//           <h3>Correct answer: {state.correctIndex + 1}</h3>
//           <h4>Leaderboard</h4>
//           <ol>
//             {state.leaderboard.map((p, i) => (
//               <li key={i}>
//                 {p.name} — {p.score}
//               </li>
//             ))}
//           </ol>
//         </div>
//       )}

//       {state.phase === "over" && (
//         <div>
//           <h3>Game over</h3>
//           <ol>
//             {state.leaderboard.map((p, i) => (
//               <li key={i}>
//                 {p.name} — {p.score}
//               </li>
//             ))}
//           </ol>
//           <p>
//             <Link to="/join">Join another</Link>
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { useSocket } from "../components/useSocket";

export default function PlayerGame() {
  const { code } = useParams();
  const [params] = useSearchParams();
  const name = useMemo(() => params.get("name") || "Player", [params]);
  const socket = useSocket();

  const [state, setState] = useState({ phase: "lobby" });
  const [answerIdx, setAnswerIdx] = useState(null);
  const [result, setResult] = useState(null);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (!socket) return; // wait until socket is ready

    socket.emit("player:join", { roomCode: code, name });

    const onLobby = ({ count }) => setState({ phase: "lobby", count });
    const onStart = (q) => {
      setState({ phase: "question", q });
      setAnswerIdx(null);
      setResult(null);
      const ms = q.endsAt - Date.now();
      setTimer(Math.ceil(ms / 1000));
    };

    const tickInterval = setInterval(() => {
      setTimer((t) => Math.max(0, t - 1));
    }, 1000);

    const onEnd = ({ correctIndex, leaderboard }) =>
      setState({ phase: "reveal", correctIndex, leaderboard });

    const onOver = ({ leaderboard }) =>
      setState({ phase: "over", leaderboard });

    const onAnswerRes = ({ correct }) =>
      setResult(correct ? "Correct!" : "Wrong");

    socket.on("lobby:update", onLobby);
    socket.on("question:start", onStart);
    socket.on("question:end", onEnd);
    socket.on("game:over", onOver);
    socket.on("player:answer_result", onAnswerRes);

    return () => {
      clearInterval(tickInterval);
      socket.off("lobby:update", onLobby);
      socket.off("question:start", onStart);
      socket.off("question:end", onEnd);
      socket.off("game:over", onOver);
      socket.off("player:answer_result", onAnswerRes);
    };
  }, [socket, code, name]);

  function answer(i) {
    setAnswerIdx(i);
    if (!socket) return;
    socket.emit("player:answer", { roomCode: code, choiceIndex: i });
  }

  return (
    <div>
      <h2>Room: {code}</h2>

      {state.phase === "lobby" && <p>Waiting for host to start... Players: {state.count || 1}</p>}

      {state.phase === "question" && (
        <div>
          <h3>{state.q.text}</h3>
          <p>Time left: {timer}s</p>
          {state.q.choices.map((c, i) => (
            <button
              key={i}
              disabled={answerIdx !== null}
              onClick={() => answer(i)}
              style={{ display: "block", margin: "8px 0" }}
            >
              {c}
            </button>
          ))}
          {result && <p>{result}</p>}
        </div>
      )}

      {state.phase === "reveal" && (
        <div>
          <h3>Correct answer: {state.correctIndex + 1}</h3>
          <h4>Leaderboard</h4>
          <ol>{state.leaderboard.map((p, i) => (<li key={i}>{p.name} — {p.score}</li>))}</ol>
        </div>
      )}

      {state.phase === "over" && (
        <div>
          <h3>Game over</h3>
          <ol>{state.leaderboard.map((p, i) => (<li key={i}>{p.name} — {p.score}</li>))}</ol>
          <p><Link to="/join">Join another</Link></p>
        </div>
      )}
    </div>
  );
}
