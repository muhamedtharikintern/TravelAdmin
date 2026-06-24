import { io } from "socket.io-client";

const SOCKET_URL = "https://traveladmin.duckdns.org";

let socket = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    socket.on("connect", () => console.log("✅ Socket connected:", socket.id));
    socket.on("disconnect", (reason) => console.log("❌ Socket disconnected:", reason));
    socket.on("connect_error", (err) => console.log("⚠️ Socket error:", err.message));
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};