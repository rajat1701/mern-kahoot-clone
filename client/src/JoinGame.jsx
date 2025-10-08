// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function JoinGame() {
//   const [code, setCode] = useState("");
//   const [name, setName] = useState("");
//   const navigate = useNavigate();

//   function join() {
//     if (code && name) {
//       navigate(`/play/${code}?name=${encodeURIComponent(name)}`);
//     }
//   }

//   return (
//     <div>
//       <h2>Join Game</h2>
//       <input placeholder="Room code" value={code} onChange={e=>setCode(e.target.value)} /><br />
//       <input placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} /><br />
//       <button onClick={join}>Join</button>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, TextField, Button, Typography } from "@mui/material";
import { Login } from "@mui/icons-material";

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
    <Box className="flex flex-col items-center justify-center min-h-screen p-6">
      <Card className="p-8 w-full max-w-md bg-[#F8FAFC]/95 backdrop-blur-sm shadow-xl border border-[#BCCCDC]/40">
        <Typography variant="h5" className="text-[#64748B] font-semibold mb-6 text-center">
          Join a Game
        </Typography>
        <TextField
          label="Room Code"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          fullWidth
          margin="normal"
          InputProps={{ style: { borderRadius: 8 } }}
        />
        <TextField
          label="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{ style: { borderRadius: 8 } }}
        />
        <Button
          fullWidth
          variant="contained"
          startIcon={<Login />}
          onClick={join}
          sx={{ mt: 3, backgroundColor: "#64748B", "&:hover": { backgroundColor: "#475569" } }}
        >
          Join Game
        </Button>
      </Card>
    </Box>
  );
}
