// import React, { useState } from "react";
// import API from "../api";

// export default function QuizEditor({ onQuizSaved }) {
//  const [quizDetails, setQuizDetails] = useState({
//      title: "",
//      description: "",
//  });
// const [currentQuestion, setCurrentQuestion] = useState({
//  text: "",
//  choices: ["", "", "", ""],
//  correctIndex: 0,
//  timeLimitSec: 15
//  });
//  function handleQuestionChange(e) { const { name, value } = e.target; setCurrentQuestion(prev => ({ ...prev, [name]: value })); }

// function handleChoiceChange(index, value) {
//  const newChoices = [...currentQuestion.choices];
//  newChoices[index] = value;
//  setCurrentQuestion(prev => ({ ...prev, choices: newChoices }));
//  }

//  function addQuestion() {
//  // Basic validation
//  if (!currentQuestion.text || currentQuestion.choices.some(c => !c)) {
//  alert("Please fill in all fields.");
//  return;
// }
//  setQuizDetails(prev => ({
//  ...prev,
//  questions: [...prev.questions, currentQuestion]
//  }));
//  // Reset for next question
//  setCurrentQuestion({
//  text: "",
//  choices: ["", "", "", ""],
//  correctIndex: 0,
//  timeLimitSec: 15
//  });
//  }

//  async function saveQuiz() {
//  if (quizDetails.questions.length === 0) {
//  alert("Please add at least one question.");
//  return;
//  }
//  try {
//  const res = await API.post("/quizzes", quizDetails);
//  console.log("Quiz saved:", res.data);
//  if (onQuizSaved) onQuizSaved(res.data);
//  } catch (error) {
//  console.error("Failed to save quiz:", error);
//  alert("Failed to save quiz.");
//  }
//  }

//  return (
//  <div>
//  <h2>Create New Quiz</h2>
//  <div>
//  <label>Title: <input type="text" value={quizDetails.title} onChange={e => setQuizDetails(p => ({ ...p, title: e.target.value }))} /></label>
//  </div>
// <div>
//  <label>Description: <textarea value={quizDetails.description} onChange={e => setQuizDetails(p => ({ ...p, description: e.target.value }))} /></label>
//  </div>

//  <hr />
//  <h3>Question #{quizDetails.questions.length + 1}</h3>
//  <div>
//  <label>
//  Question Text: <input type="text" name="text" value={currentQuestion.text} onChange={handleQuestionChange} />
//  </label>
//  </div>
// <div>
//  <label>
//  Time Limit (sec): <input type="number" name="timeLimitSec" value={currentQuestion.timeLimitSec} onChange={handleQuestionChange} min="5" max="180" />
//  </label>
//  </div>
//  <h4>Choices:</h4>
//  {currentQuestion.choices.map((choice, index) => (
//  <div key={index}>
//  <label>
//  Option {index + 1}: <input type="text" value={choice} onChange={e => handleChoiceChange(index, e.target.value)} />
//  </label>
//  </div>
//  ))}
// <div>
//  <label>
//  Correct Answer:
// <select name="correctIndex" value={currentQuestion.correctIndex} onChange={handleQuestionChange}>
//  {currentQuestion.choices.map((_, index) => (
//  <option key={index} value={index}>{`Option ${index + 1}`}</option>
//  ))}
//  </select>
//  </label>
//  </div>

//    <div style={{ marginTop: 20 }}>
//   <button onClick={addQuestion}>Add Question</button>
//     <button onClick={saveQuiz} disabled={quizDetails.questions.length === 0}>Finish Quiz ({quizDetails.questions.length} questions)</button>
//    </div>
//    </div>
//  )
  
// }


// import React, { useState } from "react";

// export default function QuizEditor({ onSave }) {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState({
//     text: "",
//     choices: ["", "", "", ""],
//     correctIndex: 0,
//     timeLimitSec: 15,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentQuestion({ ...currentQuestion, [name]: value });
//   };

//   const handleChoiceChange = (index, value) => {
//     const newChoices = [...currentQuestion.choices];
//     newChoices[index] = value;
//     setCurrentQuestion({ ...currentQuestion, choices: newChoices });
//   };

//   const addQuestion = () => {
//     if (!currentQuestion.text || currentQuestion.choices.some((c) => !c)) {
//       alert("Please fill in the question and all four choices.");
//       return;
//     }
//     setQuestions([...questions, currentQuestion]);
//     setCurrentQuestion({
//       text: "",
//       choices: ["", "", "", ""],
//       correctIndex: 0,
//       timeLimitSec: 15,
//     });
//   };

//   const endQuiz = () => {
//     if (questions.length === 0) {
//       alert("Please add at least one question before ending the quiz.");
//       return;
//     }
//     onSave({ questions });
//   };

//   return (
//     <div>
//       <h3>Add Questions ({questions.length})</h3>
//       <div>
//         <label>
//           Question Text:
//           <input
//             type="text"
//             name="text"
//             value={currentQuestion.text}
//             onChange={handleInputChange}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Time Limit (sec):
//           <input
//             type="number"
//             name="timeLimitSec"
//             value={currentQuestion.timeLimitSec}
//             onChange={handleInputChange}
//             min="5"
//             max="180"
//           />
//         </label>
//       </div>
//       <h4>Answer Choices:</h4>
//       {currentQuestion.choices.map((choice, index) => (
//         <div key={index}>
//           <label>
//             Option {index + 1}:
//             <input
//               type="text"
//               value={choice}
//               onChange={(e) => handleChoiceChange(index, e.target.value)}
//             />
//           </label>
//         </div>
//       ))}
//       <div>
//         <label>
//           Correct Answer:
//           <select
//             name="correctIndex"
//             value={currentQuestion.correctIndex}
//             onChange={handleInputChange}
//           >
//             {currentQuestion.choices.map((_, index) => (
//               <option key={index} value={index}>
//                 Option {index + 1}
//               </option>
//             ))}
//           </select>
//         </label>
//       </div>
//       <div style={{ marginTop: "1rem" }}>
//         <button onClick={addQuestion}>Add Question</button>
//         <button onClick={endQuiz} disabled={questions.length === 0}>
//           End Quiz and Create Room
//         </button>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";

// export default function QuizEditor({ onSave }) {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState({
//     text: "",
//     choices: ["", "", "", ""],
//     correctIndex: 0,
//     timeLimitSec: 15,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     // Check if the input is for a numeric value and convert it
//     if (name === "correctIndex" || name === "timeLimitSec") {
//       setCurrentQuestion({ ...currentQuestion, [name]: Number(value) });
//     } else {
//       setCurrentQuestion({ ...currentQuestion, [name]: value });
//     }
//   };

//   const handleChoiceChange = (index, value) => {
//     const newChoices = [...currentQuestion.choices];
//     newChoices[index] = value;
//     setCurrentQuestion({ ...currentQuestion, choices: newChoices });
//   };

//   const addQuestion = () => {
//     if (!currentQuestion.text || currentQuestion.choices.some((c) => !c)) {
//       alert("Please fill in the question and all four choices.");
//       return;
//     }
//     setQuestions([...questions, currentQuestion]);
//     // Reset for the next question, ensuring correctIndex and timeLimitSec are numbers
//     setCurrentQuestion({
//       text: "",
//       choices: ["", "", "", ""],
//       correctIndex: 0,
//       timeLimitSec: 15,
//     });
//   };

//   const endQuiz = () => {
//     if (questions.length === 0) {
//       alert("Please add at least one question before ending the quiz.");
//       return;
//     }
//     onSave({ questions });
//   };

//   return (
//     <div>
//       <h3>Add Questions ({questions.length})</h3>
//       <div>
//         <label>
//           Question Text:
//           <input
//             type="text"
//             name="text"
//             value={currentQuestion.text}
//             onChange={handleInputChange}
//           />


//         </label>
//       </div>
//       <div>
//         <label>
//           Time Limit (sec):
//           <input
//             type="number"
//             name="timeLimitSec"
//             value={currentQuestion.timeLimitSec}
//             onChange={handleInputChange}
//             min="5"
//             max="180"
//           />
//         </label>
//       </div>
//       <h4>Answer Choices:</h4>
//       {currentQuestion.choices.map((choice, index) => (
//         <div key={index}>
//           <label>
//             Option {index + 1}:
//             <input
//               type="text"
//               value={choice}
//               onChange={(e) => handleChoiceChange(index, e.target.value)}
//             />
//           </label>
//         </div>
//       ))}
//       <div>
//         <label>
//           Correct Answer:
//           <select
//             name="correctIndex"
//             value={currentQuestion.correctIndex}
//             onChange={handleInputChange}
//           >
//             {currentQuestion.choices.map((_, index) => (
//               <option key={index} value={index}>
//                 Option {index + 1}
//               </option>
//             ))}
//           </select>
//         </label>
//       </div>
//       <div style={{ marginTop: "1rem" }}>
//         <button onClick={addQuestion}>Add Question</button>
//         <button onClick={endQuiz} disabled={questions.length === 0}>
//           End Quiz and Create Room
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function QuizEditor({ onSave }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    text: "",
    choices: ["", "", "", ""],
    correctIndices: [], // This will now be an array
    timeLimitSec: 15,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // For time limit, ensure it's a number
    if (name === "timeLimitSec") {
      setCurrentQuestion({ ...currentQuestion, [name]: Number(value) });
    } else {
      setCurrentQuestion({ ...currentQuestion, [name]: value });
    }
  };

  const handleEditorChange = (content) => {
    setCurrentQuestion({ ...currentQuestion, text: content });

  };

  const handleChoiceChange = (index, value) => {
    const newChoices = [...currentQuestion.choices];
    newChoices[index] = value;
    setCurrentQuestion({ ...currentQuestion, choices: newChoices });
  };

  const handleCorrectAnswerChange = (index) => {
    const { correctIndices } = currentQuestion;
    const newCorrectIndices = correctIndices.includes(index)
      ? correctIndices.filter((i) => i !== index)
      : [...correctIndices, index];

    setCurrentQuestion({ ...currentQuestion, correctIndices: newCorrectIndices });
  };

  const addQuestion = () => {
    if (!currentQuestion.text || currentQuestion.choices.some((c) => !c) || currentQuestion.correctIndices.length === 0) {
      alert("Please fill in the question, all four choices, and select at least one correct answer.");
      return;
    }
    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({
      text: "",
      choices: ["", "", "", ""],
      correctIndices: [],
      timeLimitSec: 15,
    });
  };

  const endQuiz = () => {
    if (questions.length === 0) {
      alert("Please add at least one question before ending the quiz.");
      return;
    }
    onSave({ questions });
  };

  return (
    <div>
      <h3>Add Questions ({questions.length})</h3>
      <div>
        <label>Question Text:</label>
        <Editor
          apiKey="0gn1nl2pcgdtjpnb3b8iyodwu7az8ldbkqxpa75qztjwti0q" // api key from TinyMCE 
          // initialValue={currentQuestion.text});
          
          onEditorChange={handleEditorChange}
          init={{
            height: 300,
            menubar: false,
            plugins: "link lists image code fullscreen emoticons",
            toolbar:
              "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | link image | fullscreen | code",
          }}
        />
      </div>
      <div>
        <label>
          Time Limit (sec):
          <input
            type="number"
            name="timeLimitSec"
            value={currentQuestion.timeLimitSec}
            onChange={handleInputChange}
            min="5"
            max="180"
          />
        </label>
      </div>
      <h4>Answer Choices:</h4>
      {currentQuestion.choices.map((choice, index) => (
        <div key={index}>
          <label>
            <input
              type="checkbox"
              checked={currentQuestion.correctIndices.includes(index)}
              onChange={() => handleCorrectAnswerChange(index)}
            />
            Option {index + 1}:
            <input
              type="text"
              value={choice}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
            />
          </label>
        </div>
      ))}
      <div style={{ marginTop: "1rem" }}>
        <button onClick={addQuestion}>Add Question</button>
        <button onClick={endQuiz} disabled={questions.length === 0}>
          End Quiz and Create Room
        </button>
      </div>
    </div>
  );
}