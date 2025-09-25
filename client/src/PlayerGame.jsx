// // import { useEffect, useMemo, useState } from "react";
// // import { useParams, useSearchParams, Link } from "react-router-dom";
// // import { useSocket } from "./useSocket";

// // export default function PlayerGame() {
// //   const { code } = useParams();
// //   const [params] = useSearchParams();
// //   const name = useMemo(()=>params.get("name") || "Player", [params]);
// //   const socket = useSocket();
// //   const [state, setState] = useState({ phase: "lobby" });
// //   const [answerIdx, setAnswerIdx] = useState(null);
// //   const [result, setResult] = useState(null);
// //   const [timer, setTimer] = useState(0);

// //   useEffect(() => {
// //     socket.emit("player:join", { roomCode: code, name });
// //     const onLobby = ({ count }) => setState({ phase: "lobby", count });
// //     const onStart = (q) => {
// //       setState({ phase: "question", q });
// //       setAnswerIdx(null);
// //       setResult(null);
// //       const ms = q.endsAt - Date.now();
// //       setTimer(Math.ceil(ms/1000));
// //     };
// //     const tick = setInterval(() => setTimer(t=>Math.max(0,t-1)), 1000);
// //     const onEnd = ({ correctIndex, leaderboard }) => setState({ phase: "reveal", correctIndex, leaderboard });
// //     const onOver = ({ leaderboard }) => setState({ phase: "over", leaderboard });
// //     const onAnswerRes = ({ correct }) => setResult(correct ? "Correct!" : "Wrong");

// //     socket.on("lobby:update", onLobby);
// //     socket.on("question:start", onStart);
// //     socket.on("question:end", onEnd);
// //     socket.on("game:over", onOver);
// //     socket.on("player:answer_result", onAnswerRes);

// //     return () => {
// //       clearInterval(tick);
// //       socket.off("lobby:update", onLobby);
// //       socket.off("question:start", onStart);
// //       socket.off("question:end", onEnd);
// //       socket.off("game:over", onOver);
// //       socket.off("player:answer_result", onAnswerRes);
// //     }
// //   }, [socket, code, name]);

// //   function answer(i) {
// //     setAnswerIdx(i);
// //     socket.emit("player:answer", { roomCode: code, choiceIndex: i });
// //   }

// //   return (
// //     <div>
// //       <h2>Room: {code}</h2>
// //       {state.phase === "lobby" && <p>Waiting... Players: {state.count || 1}</p>}

// //       {state.phase === "question" && (
// //         <div>
// //           <h3>{state.q.text}</h3>
// //           <p>Time left: {timer}s</p>
// //           {state.q.choices.map((c,i)=>(
// //             <button key={i} disabled={answerIdx!==null} onClick={()=>answer(i)}>{c}</button>
// //           ))}
// //           {result && <p>{result}</p>}
// //         </div>
// //       )}

// //       {state.phase === "reveal" && (
// //         <div>
// //           <h3>Correct answer: {state.correctIndex + 1}</h3>
// //           <h4>Leaderboard</h4>
// //           <ol>{state.leaderboard.map((p,i)=><li key={i}>{p.name} — {p.score}</li>)}</ol>
// //         </div>
// //       )}

// //       {state.phase === "over" && (
// //         <div>
// //           <h3>Game over</h3>
// //           <ol>{state.leaderboard.map((p,i)=><li key={i}>{p.name} — {p.score}</li>)}</ol>
// //           <p><Link to="/join">Join another</Link></p>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }

// // import { useEffect, useMemo, useState } from "react";
// // import { useParams, useSearchParams, Link } from "react-router-dom";
// // import { useSocket } from "./useSocket";

// // export default function PlayerGame() {
// //   const { code } = useParams();
// //   const [params] = useSearchParams();
// //   const name = useMemo(()=>params.get("name") || "Player", [params]);
// //   const socket = useSocket();
// //   const [state, setState] = useState({ phase: "lobby" });
// //   const [answerIdx, setAnswerIdx] = useState(null);
// //   const [result, setResult] = useState(null);
// //   const [timer, setTimer] = useState(0);

// //   useEffect(() => {
// //     socket.emit("player:join", { roomCode: code, name });
// //     const onLobby = ({ count }) => setState({ phase: "lobby", count });
// //     const onStart = (q) => {
// //       setState({ phase: "question", q });
// //       setAnswerIdx(null);
// //       setResult(null);
// //       const ms = q.endsAt - Date.now();
// //       setTimer(Math.ceil(ms/1000));
// //     };
// //     const tick = setInterval(() => setTimer(t=>Math.max(0,t-1)), 1000);
    

// //     // Update to expect correctIndices as an array
// //     const onEnd = ({ correctIndices, leaderboard }) => setState({ phase: "reveal", correctIndices, leaderboard });

// //     const onOver = ({ leaderboard }) => setState({ phase: "over", leaderboard });
// //     const onAnswerRes = ({ correct }) => setResult(correct ? "Correct!" : "Wrong");

// //     socket.on("lobby:update", onLobby);
// //     socket.on("question:start", onStart);
// //     socket.on("question:end", onEnd);
// //     socket.on("game:over", onOver);
// //     socket.on("player:answer_result", onAnswerRes);

// //     return () => {
// //       clearInterval(tick);
// //       socket.off("lobby:update", onLobby);
// //       socket.off("question:start", onStart);
// //       socket.off("question:end", onEnd);
// //       socket.off("game:over", onOver);
// //       socket.off("player:answer_result", onAnswerRes);
// //     }
// //   }, [socket, code, name]);

// //   function answer(i) {
// //     setAnswerIdx(i);
// //     socket.emit("player:answer", { roomCode: code, choiceIndex: i });
// //   }

// //   return (
// //     <div>
// //       <h2>Room: {code}</h2>
// //       {state.phase === "lobby" && <p>Waiting... Players: {state.count || 1}</p>}

// //       {state.phase === "question" && (
// //         <div>
// //           <h3>{state.q.text}</h3>
// //           <p>Time left: {timer}s</p>
// //           {state.q.choices.map((c,i)=>(
// //             <button key={i} disabled={answerIdx!==null} onClick={()=>answer(i)}>{c}</button>
// //           ))}
// //           {result && <p>{result}</p>}
// //         </div>
// //       )}

// //       {state.phase === "reveal" && (
// //         <div>
// //           {/* Update rendering to show all correct answers from the array */}
// //           <h3>Correct answer(s):
// //             {state.correctIndices.map((idx, i) => (
// //               <span key={i}> {idx + 1}</span>
// //             ))}
// //           </h3>
// //           <h4>Leaderboard</h4>
// //           <ol>{state.leaderboard.map((p,i)=><li key={i}>{p.name} — {p.score}</li>)}</ol>
// //         </div>
// //       )}

// //       {state.phase === "over" && (
// //         <div>
// //           <h3>Game over</h3>
// //           <ol>{state.leaderboard.map((p,i)=><li key={i}>{p.name} — {p.score}</li>)}</ol>
// //           <p><Link to="/join">Join another</Link></p>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }

// // import { useEffect, useMemo, useState } from "react";
// // import { useParams, useSearchParams, Link } from "react-router-dom";
// // import { useSocket } from "./useSocket";

// // export default function PlayerGame() {
// //   const { code } = useParams();
// //   const [params] = useSearchParams();
// //   const name = useMemo(()=>params.get("name") || "Player", [params]);
// //   const socket = useSocket();
// //   const [state, setState] = useState({ phase: "lobby" });
// //   const [answerIdx, setAnswerIdx] = useState(null);
// //   const [result, setResult] = useState(null);
// //   const [timer, setTimer] = useState(0);

// //   useEffect(() => {
// //     socket.emit("player:join", { roomCode: code, name });
// //     const onLobby = ({ count }) => setState({ phase: "lobby", count });
// //     const onStart = (q) => {
// //       setState({ phase: "question", q });
// //       setAnswerIdx(null);
// //       setResult(null);
// //       const ms = q.endsAt - Date.now();
// //       setTimer(Math.ceil(ms/1000));
// //     };
// //     const tick = setInterval(() => setTimer(t=>Math.max(0,t-1)), 1000);
    
// //     // Updated onEnd handler to directly set the state from the socket event
// //     const onEnd = ({ correctIndices, leaderboard }) => {
// //       setState(prevState => ({ 
// //         ...prevState, 
// //         phase: "reveal", 
// //         correctIndices, 
// //         leaderboard 
// //       }));
// //     };
    
// //     const onOver = ({ leaderboard }) => setState({ phase: "over", leaderboard });
// //     const onAnswerRes = ({ correct }) => setResult(correct ? "Correct!" : "Wrong");

// //     socket.on("lobby:update", onLobby);
// //     socket.on("question:start", onStart);
// //     socket.on("question:end", onEnd);
// //     socket.on("game:over", onOver);
// //     socket.on("player:answer_result", onAnswerRes);

// //     return () => {
// //       clearInterval(tick);
// //       socket.off("lobby:update", onLobby);
// //       socket.off("question:start", onStart);
// //       socket.off("question:end", onEnd);
// //       socket.off("game:over", onOver);
// //       socket.off("player:answer_result", onAnswerRes);
// //     }
// //   }, [socket, code, name]); // No state.q needed here

// //   function answer(i) {
// //     setAnswerIdx(i);
// //     socket.emit("player:answer", { roomCode: code, choiceIndex: i });
// //   }

// //   // Define a new variable to store the correct answers for rendering
// //   const correctAnswers = useMemo(() => {
// //     if (state.phase === "reveal" && state.q && state.correctIndices) {
// //       return state.correctIndices.map(index => state.q.choices[index]);
// //     }
// //     return [];
// //   }, [state]);

// //   return (
// //     <div>
// //       <h2>Room: {code}</h2>
// //       {state.phase === "lobby" && <p>Waiting... Players: {state.count || 1}</p>}

// //       {state.phase === "question" && (
// //         <div>
// //           <h3>{state.q.text}</h3>
// //           <p>Time left: {timer}s</p>
// //           {state.q.choices.map((c,i)=>(
// //             <button key={i} disabled={answerIdx!==null} onClick={()=>answer(i)}>{c}</button>
// //           ))}
// //           {result && <p>{result}</p>}
// //         </div>
// //       )}

// //       {state.phase === "reveal" && (
// //         <div>
// //           <h3>Correct answer(s):</h3>
// //           <ul>
// //             {correctAnswers.map((answer, i) => (
// //               <li key={i}> {answer}</li>
// //             ))}
// //           </ul>
// //           <h4>Leaderboard</h4>
// //           <ol>{state.leaderboard.map((p,i)=><li key={i}>{p.name} — {p.score}</li>)}</ol>
// //         </div>
// //       )}

// //       {state.phase === "over" && (
// //         <div>
// //           <h3>Game over</h3>
// //           <ol>{state.leaderboard.map((p,i)=><li key={i}>{p.name} — {p.score}</li>)}</ol>
// //           <p><Link to="/join">Join another</Link></p>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }


// import { useEffect, useMemo, useState } from "react";
// import { useParams, useSearchParams, Link } from "react-router-dom";
// import { useSocket } from "./useSocket";

// export default function PlayerGame() {
//   const { code } = useParams();
//   const [params] = useSearchParams();
//   const name = useMemo(()=>params.get("name") || "Player", [params]);
//   const socket = useSocket();
//   const [state, setState] = useState({ phase: "lobby" });
//   const [selectedAnswers, setSelectedAnswers] = useState([]); // Array for checkboxes
//   const [selectedRadioAnswer, setSelectedRadioAnswer] = useState(null); // String/Number for radio buttons
//   const [result, setResult] = useState(null);
//   const [timer, setTimer] = useState(0);

//   useEffect(() => {
//     socket.emit("player:join", { roomCode: code, name });
//     const onLobby = ({ count }) => setState({ phase: "lobby", count });
//     const onStart = (q) => {
//       setState({ phase: "question", q });
//       setSelectedAnswers([]);
//       setSelectedRadioAnswer(null);
//       setResult(null);
//       const ms = q.endsAt - Date.now();
//       setTimer(Math.ceil(ms/1000));
//     };
//     const tick = setInterval(() => setTimer(t=>Math.max(0,t-1)), 1000);
//     const onEnd = ({ correctIndices, leaderboard }) => setState(prevState => ({ ...prevState, phase: "reveal", correctIndices, leaderboard }));
//     const onOver = ({ leaderboard }) => setState({ phase: "over", leaderboard });
//     const onAnswerRes = ({ correct }) => setResult(correct ? "Correct!" : "Wrong");

//     socket.on("lobby:update", onLobby);
//     socket.on("question:start", onStart);
//     socket.on("question:end", onEnd);
//     socket.on("game:over", onOver);
//     socket.on("player:answer_result", onAnswerRes);

//     return () => {
//       clearInterval(tick);
//       socket.off("lobby:update", onLobby);
//       socket.off("question:start", onStart);
//       socket.off("question:end", onEnd);
//       socket.off("game:over", onOver);
//       socket.off("player:answer_result", onAnswerRes);
//     }
//   }, [socket, code, name]);

//   const handleCheckboxChange = (index) => {
//     setSelectedAnswers(prevAnswers => 
//       prevAnswers.includes(index) 
//         ? prevAnswers.filter(i => i !== index) 
//         : [...prevAnswers, index]
//     );
//   };

//   const handleRadioChange = (index) => {
//     setSelectedRadioAnswer(index);
//   };
  
//   const submitAnswers = () => {
//     if (state.q.hasMultipleAnswers) {
//       if (selectedAnswers.length > 0) {
//         const sortedAnswers = selectedAnswers.sort((a, b) => a - b);
//         socket.emit("player:answer", { roomCode: code, choiceIndices: sortedAnswers });
//       }
//     } else {
//       if (selectedRadioAnswer !== null) {
//         socket.emit("player:answer", { roomCode: code, choiceIndices: [selectedRadioAnswer] });
//       }
//     }
//   };

//   const correctAnswersText = useMemo(() => {
//     if (state.phase === "reveal" && state.q && state.correctIndices) {
//       return state.correctIndices.map(index => state.q.choices[index]);
//     }
//     return [];
//   }, [state]);

//   return (
//     <div>
//       <h2>Room: {code}</h2>
//       {state.phase === "lobby" && <p>Waiting... Players: {state.count || 1}</p>}

//       {state.phase === "question" && (
//         <div>
//           <h3>{state.q.text}</h3>
//           <p>Time left: {timer}s</p>
//           {state.q.choices.map((c, i) => (
//             <div key={i}>
//               <label>
//                 {state.q.hasMultipleAnswers ? (
//                   // Render checkboxes for multiple-answer questions
//                   <input
//                     type="checkbox"
//                     checked={selectedAnswers.includes(i)}
//                     onChange={() => handleCheckboxChange(i)}
//                   />
//                 ) : (
//                   // Render radio buttons for single-answer questions
//                   <input
//                     type="radio"
//                     name="answer"
//                     value={i}
//                     checked={selectedRadioAnswer === i}
//                     onChange={() => handleRadioChange(i)}
//                   />
//                 )}
//                 {c}
//               </label>
//             </div>
//           ))}
//           <button 
//             onClick={submitAnswers} 
//             disabled={(state.q.hasMultipleAnswers && selectedAnswers.length === 0) || (!state.q.hasMultipleAnswers && selectedRadioAnswer === null) || result !== null}
//           >
//             Submit Answer
//           </button>
//           {result && <p>{result}</p>}
//         </div>
//       )}

//       {state.phase === "reveal" && (
//         <div>
//           <h3>Correct answer(s):</h3>
//           <ul>
//             {correctAnswersText.map((answer, i) => (
//               <li key={i}> {answer}</li>
//             ))}
//           </ul>
//           <h4>Leaderboard</h4>
//           <ol>{state.leaderboard.map((p,i)=><li key={i}>{p.name} — {p.score}</li>)}</ol>
//         </div>
//       )}

//       {state.phase === "over" && (
//         <div>
//           <h3>Game over</h3>
//           <ol>{state.leaderboard.map((p,i)=><li key={i}>{p.name} — {p.score}</li>)}</ol>
//           <p><Link to="/join">Join another</Link></p>
//         </div>
//       )}
//     </div>
//   )
// }



// import { useEffect, useMemo, useState } from "react";
// import { useParams, useSearchParams, Link } from "react-router-dom";
// import { useSocket } from "./useSocket";

// export default function PlayerGame() {
//   const { code } = useParams();
//   const [params] = useSearchParams();
//   const name = useMemo(()=>params.get("name") || "Player", [params]);
//   const socket = useSocket();
//   const [state, setState] = useState({ phase: "lobby" });
//   const [selectedAnswers, setSelectedAnswers] = useState([]);
//   const [selectedRadioAnswer, setSelectedRadioAnswer] = useState(null);
//   const [result, setResult] = useState(null);
//   const [timer, setTimer] = useState(0);

//   useEffect(() => {
//     if (!socket) return;
//     socket.emit("player:join", { roomCode: code, name });

//     const onLobby = ({ count }) => setState(prevState => ({ ...prevState, phase: "lobby", count }));
    
//     // FIX: Use functional update to ensure you have the latest state
//     const onStart = (q) => {
//       setState(prevState => ({ ...prevState, phase: "question", q }));
//       setSelectedAnswers([]);
//       setSelectedRadioAnswer(null);
//       setResult(null);
//       const ms = q.endsAt - Date.now();
//       setTimer(Math.ceil(ms/1000));
//     };

//     const tick = setInterval(() => setTimer(t => Math.max(0,t-1)), 1000);
    
//     // FIX: Use functional update to ensure you have the latest state
//     const onEnd = ({ correctIndices, leaderboard }) => {
//       setState(prevState => ({ ...prevState, phase: "reveal", correctIndices, leaderboard }));
//     };

//     const onOver = ({ leaderboard }) => setState(prevState => ({ ...prevState, phase: "over", leaderboard }));
//     const onAnswerRes = ({ correct }) => setResult(correct ? "Correct!" : "Wrong");

//     socket.on("lobby:update", onLobby);
//     socket.on("question:start", onStart);
//     socket.on("question:end", onEnd);
//     socket.on("game:over", onOver);
//     socket.on("player:answer_result", onAnswerRes);

//     return () => {
//       clearInterval(tick);
//       socket.off("lobby:update", onLobby);
//       socket.off("question:start", onStart);
//       socket.off("question:end", onEnd);
//       socket.off("game:over", onOver);
//       socket.off("player:answer_result", onAnswerRes);
//     };
//   }, [socket, code, name]);

//   const handleCheckboxChange = (index) => {
//     setSelectedAnswers(prevAnswers => 
//       prevAnswers.includes(index) 
//         ? prevAnswers.filter(i => i !== index) 
//         : [...prevAnswers, index]
//     );
//   };

//   const handleRadioChange = (index) => {
//     setSelectedRadioAnswer(index);
//   };
  
//   const submitAnswers = () => {
//     const q = state.q; // Access the latest question from state
//     if (!q) return;

//     if (q.hasMultipleAnswers) {
//       if (selectedAnswers.length > 0) {
//         const sortedAnswers = selectedAnswers.sort((a, b) => a - b);
//         socket.emit("player:answer", { roomCode: code, choiceIndices: sortedAnswers });
//       }
//     } else {
//       if (selectedRadioAnswer !== null) {
//         socket.emit("player:answer", { roomCode: code, choiceIndices: [selectedRadioAnswer] });
//       }
//     }
//   };

//   const correctAnswersText = useMemo(() => {
//     if (state.phase === "reveal" && state.q && state.correctIndices) {
//       return state.correctIndices.map(index => state.q.choices[index]);
//     }
//     return [];
//   }, [state]);

//   return (
//     <div>
//       <h2>Room: {code}</h2>
//       {state.phase === "lobby" && <p>Waiting... Players: {state.count || 1}</p>}

//       {state.phase === "question" && (
//         <div>
//           <h3>{state.q.text}</h3>
//           <p>Time left: {timer}s</p>
//           {state.q.choices.map((c, i) => (
//             <div key={i}>
//               <label>
//                 {state.q.hasMultipleAnswers ? (
//                   <input
//                     type="checkbox"
//                     checked={selectedAnswers.includes(i)}
//                     onChange={() => handleCheckboxChange(i)}
//                   />
//                 ) : (
//                   <input
//                     type="radio"
//                     name="answer"
//                     value={i}
//                     checked={selectedRadioAnswer === i}
//                     onChange={() => handleRadioChange(i)}
//                   />
//                 )}
//                 {c}
//               </label>
//             </div>
//           ))}
//           <button 
//             onClick={submitAnswers} 
//             disabled={(state.q.hasMultipleAnswers && selectedAnswers.length === 0) || (!state.q.hasMultipleAnswers && selectedRadioAnswer === null) || result !== null}
//           >
//             Submit Answer
//           </button>
//           {result && <p>{result}</p>}
//         </div>
//       )}

//       {state.phase === "reveal" && (
//         <div>
//           <h3>Correct answer(s):</h3>
//           <ul>
//             {correctAnswersText.map((answer, i) => (
//               <li key={i}> {answer}</li>
//             ))}
//           </ul>
//           <h4>Leaderboard</h4>
//           <ol>{state.leaderboard.map((p,i)=><li key={i}>{p.name} — {p.score}</li>)}</ol>
//         </div>
//       )}

//       {state.phase === "over" && (
//         <div>
//           <h3>Game over</h3>
//           <ol>{state.leaderboard.map((p,i)=><li key={i}>{p.name} — {p.score}</li>)}</ol>
//           <p><Link to="/join">Join another</Link></p>
//         </div>
//       )}
//     </div>
//   );
// }

// import { useEffect, useMemo, useState } from "react";
// import { useParams, useSearchParams, Link } from "react-router-dom";
// import { useSocket } from "./useSocket";

// export default function PlayerGame() {
//   const { code } = useParams();
//   const [params] = useSearchParams();
//   const name = useMemo(()=>params.get("name") || "Player", [params]);
//   const socket = useSocket();
//   const [state, setState] = useState({ phase: "lobby" });
//   const [selectedAnswers, setSelectedAnswers] = useState([]);
//   const [selectedRadioAnswer, setSelectedRadioAnswer] = useState(null);
//   const [result, setResult] = useState(null);
//   const [timer, setTimer] = useState(0);

//   useEffect(() => {
//     if (!socket) return;
//     socket.emit("player:join", { roomCode: code, name });

//     const onLobby = ({ count }) => setState({ phase: "lobby", count });
    
//     // Use functional state update to handle incoming question data
//     const onStart = (q) => {
//       setState(prevState => ({ ...prevState, phase: "question", q }));
//       setSelectedAnswers([]);
//       setSelectedRadioAnswer(null);
//       setResult(null);
//       const ms = q.endsAt - Date.now();
//       setTimer(Math.ceil(ms/1000));
//     };

//     const tick = setInterval(() => setTimer(t => Math.max(0,t-1)), 1000);
    
//     // Use functional state update for reveal phase
//     const onEnd = ({ correctIndices, leaderboard }) => {
//       setState(prevState => ({ ...prevState, phase: "reveal", correctIndices, leaderboard }));
//     };

//     const onOver = ({ leaderboard }) => setState(prevState => ({ ...prevState, phase: "over", leaderboard }));
//     const onAnswerRes = ({ correct }) => setResult(correct ? "Correct!" : "Wrong");

//     socket.on("lobby:update", onLobby);
//     socket.on("question:start", onStart);
//     socket.on("question:end", onEnd);
//     socket.on("game:over", onOver);
//     socket.on("player:answer_result", onAnswerRes);

//     return () => {
//       clearInterval(tick);
//       // Clean up all listeners to prevent memory leaks and unexpected behavior
//       socket.off("lobby:update", onLobby);
//       socket.off("question:start", onStart);
//       socket.off("question:end", onEnd);
//       socket.off("game:over", onOver);
//       socket.off("player:answer_result", onAnswerRes);
//     };
//   }, [socket, code, name]); // The dependency array is correct and clean

//   const handleCheckboxChange = (index) => {
//     // ... same as before
//     setSelectedAnswers(prevAnswers => 
//       prevAnswers.includes(index) 
//         ? prevAnswers.filter(i => i !== index) 
//         : [...prevAnswers, index]
//     );
//   };

//   const handleRadioChange = (index) => {
//     // ... same as before
//     setSelectedRadioAnswer(index);
//   };
  
//   const submitAnswers = () => {
//     // Access the latest question data directly from the state
//     const q = state.q;
//     if (!q) return;

//     if (q.hasMultipleAnswers) {
//       if (selectedAnswers.length > 0) {
//         const sortedAnswers = selectedAnswers.sort((a, b) => a - b);
//         socket.emit("player:answer", { roomCode: code, choiceIndices: sortedAnswers });
//       }
//     } else {
//       if (selectedRadioAnswer !== null) {
//         socket.emit("player:answer", { roomCode: code, choiceIndices: [selectedRadioAnswer] });
//       }
//     }
//   };

//   const correctAnswersText = useMemo(() => {
//     if (state.phase === "reveal" && state.q && state.correctIndices) {
//       return state.correctIndices.map(index => state.q.choices[index]);
//     }
//     return [];
//   }, [state]);

//   // The rendering logic remains the same
//   return (
//     <div>
//       {/* ... */}
//       {state.phase === "lobby" && <p>Waiting... Players: {state.count || 1}</p>}

//       {state.phase === "question" && (
//         <div>
//           {/* <h3>{state.q.text}</h3> */}
//           <h3 dangerouslySetInnerHTML={{ __html: state.q.text }}></h3>
//           <p>Time left: {timer}s</p>
//           {state.q.choices.map((c, i) => (
//             <div key={i}>
//               <label>
//                 {state.q.hasMultipleAnswers ? (
//                   <input
//                     type="checkbox"
//                     checked={selectedAnswers.includes(i)}
//                     onChange={() => handleCheckboxChange(i)}
//                   />
//                 ) : (
//                   <input
//                     type="radio"
//                     name="answer"
//                     value={i}
//                     checked={selectedRadioAnswer === i}
//                     onChange={() => handleRadioChange(i)}
//                   />
//                 )}
//                 {c}
//               </label>
//             </div>
//           ))}
//           <button 
//             onClick={submitAnswers} 
//             disabled={(state.q.hasMultipleAnswers && selectedAnswers.length === 0) || (!state.q.hasMultipleAnswers && selectedRadioAnswer === null) || result !== null}
//           >
//             Submit Answer
//           </button>
//           {result && <p>{result}</p>}
//         </div>
//       )}

//       {state.phase === "reveal" && (
//         <div>
//           <h3>Correct answer(s):</h3>
//           <ul>
//             {correctAnswersText.map((answer, i) => (
//               <li key={i}> {answer}</li>
//             ))}
//           </ul>
//           <h4>Leaderboard</h4>
//           <ol>{state.leaderboard.map((p,i)=><li key={i}>{p.name} — {p.score}</li>)}</ol>
//         </div>
//       )}

//       {state.phase === "over" && (
//         <div>
//           <h3>Game over</h3>
//           <ol>{state.leaderboard.map((p,i)=><li key={i}>{p.name} — {p.score}</li>)}</ol>
//           <p><Link to="/join">Join another</Link></p>
//         </div>
//       )}
//     </div>
//   );
// }



import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { useSocket } from "./useSocket";

// Import Material-UI components
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function PlayerGame() {
  const { code } = useParams();
  const [params] = useSearchParams();
  const name = useMemo(()=>params.get("name") || "Player", [params]);
  const socket = useSocket();
  const [state, setState] = useState({ phase: "lobby" });
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [selectedRadioAnswer, setSelectedRadioAnswer] = useState(null);
  const [result, setResult] = useState(null);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (!socket) return;
    socket.emit("player:join", { roomCode: code, name });

    const onLobby = ({ count }) => setState(prevState => ({ ...prevState, phase: "lobby", count }));
    
    const onStart = (q) => {
      setState(prevState => ({ ...prevState, phase: "question", q }));
      setSelectedAnswers([]);
      setSelectedRadioAnswer(null);
      setResult(null);
      const ms = q.endsAt - Date.now();
      setTimer(Math.ceil(ms/1000));
    };

    const tick = setInterval(() => setTimer(t => Math.max(0,t-1)), 1000);
    
    const onEnd = ({ correctIndices, leaderboard }) => {
      setState(prevState => ({ ...prevState, phase: "reveal", correctIndices, leaderboard }));
    };

    const onOver = ({ leaderboard }) => setState(prevState => ({ ...prevState, phase: "over", leaderboard }));
    const onAnswerRes = ({ correct }) => setResult(correct ? "Correct!" : "Wrong");

    socket.on("lobby:update", onLobby);
    socket.on("question:start", onStart);
    socket.on("question:end", onEnd);
    socket.on("game:over", onOver);
    socket.on("player:answer_result", onAnswerRes);

    return () => {
      clearInterval(tick);
      socket.off("lobby:update", onLobby);
      socket.off("question:start", onStart);
      socket.off("question:end", onEnd);
      socket.off("game:over", onOver);
      socket.off("player:answer_result", onAnswerRes);
    };
  }, [socket, code, name]);

  const handleCheckboxChange = (index) => {
    setSelectedAnswers(prevAnswers => 
      prevAnswers.includes(index) 
        ? prevAnswers.filter(i => i !== index) 
        : [...prevAnswers, index]
    );
  };

  const handleRadioChange = (event) => {
    setSelectedRadioAnswer(Number(event.target.value));
  };
  
  const submitAnswers = () => {
    const q = state.q; 
    if (!q) return;

    if (q.hasMultipleAnswers) {
      if (selectedAnswers.length > 0) {
        const sortedAnswers = selectedAnswers.sort((a, b) => a - b);
        socket.emit("player:answer", { roomCode: code, choiceIndices: sortedAnswers });
      }
    } else {
      if (selectedRadioAnswer !== null) {
        socket.emit("player:answer", { roomCode: code, choiceIndices: [selectedRadioAnswer] });
      }
    }
  };

  const correctAnswersText = useMemo(() => {
    if (state.phase === "reveal" && state.q && state.correctIndices) {
      return state.correctIndices.map(index => state.q.choices[index]);
    }
    return [];
  }, [state]);

  return (
    <Box sx={{ p: 6 }}>  
      {state.phase === "lobby" && <Typography variant="body1">Waiting... Players: {state.count || 1}</Typography>}

      {state.phase === "question" && (
        <Box>
          <div dangerouslySetInnerHTML={{ __html: state.q.text }} />
          <Typography variant="body2" sx={{ mt: 2 }}>Time left: {timer}s</Typography>

          {state.q.hasMultipleAnswers ? (
            <FormGroup sx={{ mt: 2 }}>
              {state.q.choices.map((c, i) => (
                <FormControlLabel
                  key={i}
                  control={
                    <Checkbox
                      checked={selectedAnswers.includes(i)}
                      onChange={() => handleCheckboxChange(i)}
                    />
                  }
                  label={c}
                />
              ))}
            </FormGroup>
          ) : (
            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <FormLabel component="legend">Select an Answer</FormLabel>
              <RadioGroup
                aria-label="answers"
                name="radio-buttons-group"
                value={selectedRadioAnswer}
                onChange={handleRadioChange}
              >
                {state.q.choices.map((c, i) => (
                  <FormControlLabel
                    key={i}
                    value={i}
                    control={<Radio />}
                    label={c}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}

          <Button
            variant="contained"
            onClick={submitAnswers}
            disabled={(state.q.hasMultipleAnswers && selectedAnswers.length === 0) || (!state.q.hasMultipleAnswers && selectedRadioAnswer === null) || result !== null}
            sx={{ mt: 2 }}
          >
            Submit Answer
          </Button>

          {result && <Typography variant="body1" sx={{ mt: 2 }}>{result}</Typography>}
        </Box>
      )}

      {state.phase === "reveal" && (
        <Box>
          <Typography variant="h5">Correct answer(s):</Typography>
          <ul>
            {correctAnswersText.map((answer, i) => (
              <li key={i}>{answer}</li>
            ))}
          </ul>
          <Typography variant="h6" sx={{ mt: 2 }}>Leaderboard</Typography>
          <ol>{state.leaderboard.map((p,i)=><li key={i}>{p.name} — {p.score}</li>)}</ol>
        </Box>
      )}

      {state.phase === "over" && (
        <Box>
          <Typography variant="h5">Game over</Typography>
          <ol>{state.leaderboard.map((p,i)=><li key={i}>{p.name} — {p.score}</li>)}</ol>
          <Button variant="contained" component={Link} to="/join" sx={{ mt: 2 }}>Join another</Button>
        </Box>
      )}
    </Box>
  )
}