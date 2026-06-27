import { io } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const registerCaptainSocket = async (captainId) => {
  try {
    const token = await AsyncStorage.getItem("token");

    // ✅ Correct endpoint is /auth/me not /auth/profile
    const res = await fetch("https://traveladmin.duckdns.org/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    console.log("👤 Profile response:", JSON.stringify(data));

    const vehicleType = data.user?.vehicleType;
    console.log("🚗 Captain vehicleType:", vehicleType);

    const socket = getSocket();
    socket.emit("captain:register", { captainId, vehicleType });
    console.log("✅ Captain registered with socket | vehicleType:", vehicleType);

    return vehicleType;
  } catch (err) {
    console.log("❌ registerCaptainSocket error:", err);
    return null;
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};