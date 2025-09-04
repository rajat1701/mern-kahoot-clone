// import { useEffect, useRef } from "react";
// import { io } from "socket.io-client";

// export function useSocket() {
//   const ref = useRef(null);
//   useEffect(() => {
//     const url = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";
//     const s = io(url, { withCredentials: true });
//     ref.current = s;
//     return () => {
//       s.disconnect();
//     };
//   }, []);
//   return ref.current;
// }


// src/components/useSocket.js
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export function useSocket() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const url = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

    const s = io(url, {
      transports: ["websocket"], // force websocket transport
      autoConnect: true,
    });

    s.on("connect", () => {
      console.log("✅ Socket connected:", s.id);
      setSocket(s);
    });

    s.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err.message);
    });

    return () => {
      s.disconnect();
    };
  }, []);

  return socket;
}

