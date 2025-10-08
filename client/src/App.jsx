// import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
// import HostGame from "./HostGame";
// import JoinGame from "./JoinGame";
// import PlayerGame from "./PlayerGame";
// import Navigation from "./components/Navigation";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Navigation />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/host" element={<HostGame />} />
//         <Route path="/join" element={<JoinGame />} />
//         <Route path="/play/:code" element={<PlayerGame />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// function Home() {
//   return (    
//     <div>
//       <h2>Welcome</h2>
//       <Link to="/host">Host a game</Link><br />
//       <Link to="/join">Join a game</Link>
//     </div>
//   );
// }

// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import { Box, Button, Typography, Card } from "@mui/material";
// import HostGame from "./HostGame";
// import JoinGame from "./JoinGame";
// import PlayerGame from "./PlayerGame";
// import Navigation from "./components/Navigation";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Navigation />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/host" element={<HostGame />} />
//         <Route path="/join" element={<JoinGame />} />
//         <Route path="/play/:code" element={<PlayerGame />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// function Home() {
//   return (
//     <Box
//       sx={{
//         height: "90vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: "column",
//         background: "linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)",
//         textAlign: "center",
//       }}
//     >
//       <Card
//         sx={{
//           p: 6,
//           borderRadius: 4,
//           backgroundColor: "rgba(255,255,255,0.9)",
//           boxShadow: "0 8px 20px rgba(100, 116, 139, 0.2)",
//           backdropFilter: "blur(10px)",
//           maxWidth: 500,
//         }}
//       >
//         <Typography
//           variant="h3"
//           sx={{
//             fontWeight: 700,
//             color: "#334155",
//             mb: 3,
//             fontFamily: "Poppins, sans-serif",
//           }}
//         >
//           Instant Trivia. Infinite Fun.
//         </Typography>

//         <Typography
//           variant="subtitle1"
//           sx={{
//             mb: 5,
//             color: "#64748B",
//             fontFamily: "Inter, sans-serif",
//           }}
//         >
//           Create your quiz, invite friends, and compete live — all in real time!
//         </Typography>

//         <Box display="flex" justifyContent="center" gap={3}>
//           <Button
//             variant="contained"
//             component={Link}
//             to="/host"
//             sx={{
//               backgroundColor: "#64748B",
//               "&:hover": { backgroundColor: "#475569" },
//               borderRadius: 3,
//               px: 4,
//               py: 1.5,
//               textTransform: "none",
//               fontWeight: 600,
//             }}
//           >
//             Host a Game
//           </Button>

//           <Button
//             variant="outlined"
//             component={Link}
//             to="/join"
//             sx={{
//               borderColor: "#64748B",
//               color: "#64748B",
//               "&:hover": { backgroundColor: "#E2E8F0" },
//               borderRadius: 3,
//               px: 4,
//               py: 1.5,
//               textTransform: "none",
//               fontWeight: 600,
//             }}
//           >
//             Join a Game
//           </Button>
//         </Box>
//       </Card>
//     </Box>
//   );
// }


import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HostGame from "./HostGame";
import JoinGame from "./JoinGame";
import PlayerGame from "./PlayerGame";
import Navigation from "./components/Navigation";
import { Button } from "./components/ui/button";
import { motion } from "framer-motion";

export default function App() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 animate-gradient bg-[length:400%_400%] bg-gradient-to-br from-[#dbeafe] via-[#f1f5f9] to-[#cbd5e1] -z-10"></div>

      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/host" element={<HostGame />} />
          <Route path="/join" element={<JoinGame />} />
          <Route path="/play/:code" element={<PlayerGame />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[80vh] px-4">
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-[#475569] mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Instant Trivia. <span className="text-[#64748B]">Infinite Fun.</span>
      </motion.h1>

      <motion.p
        className="text-[#64748B] text-lg mb-10 max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
         Create your quiz, invite friends, and compete live — all in real time!
      </motion.p>

      <motion.div
        className="flex gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link to="/host">
          <Button className="bg-[#64748B] hover:bg-[#64748B]/90 text-white text-lg px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all">
            Host a Game
          </Button>
        </Link>
        <Link to="/join">
          <Button
            variant="outline"
            className="border-[#64748B] text-[#64748B] hover:bg-[#D9EAFD] text-lg px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Join a Game
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
