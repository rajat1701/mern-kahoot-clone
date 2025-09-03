import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export function useSocket() {
  const ref = useRef(null);
  useEffect(() => {
    const url = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";
    const s = io(url, { withCredentials: true });
    ref.current = s;
    return () => {
      s.disconnect();
    };
  }, []);
  return ref.current;
}
