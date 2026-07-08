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
    const res = await fetch("https://traveladmin.duckdns.org/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    const vehicleType = data.user?.vehicleType;
    console.log("🚗 Captain vehicleType:", vehicleType);

    const socket = getSocket();
    const doRegister = () => {
      socket.emit("captain:register", { captainId, vehicleType });
      console.log("✅ Captain registered with socket | vehicleType:", vehicleType);
    };

    if (socket.connected) {
      doRegister();
    } else {
      socket.once("connect", doRegister);
    }

    return { socket, vehicleType };
  } catch (err) {
    console.log("❌ registerCaptainSocket error:", err);
    return { socket: null, vehicleType: null };
  }
};

// ✅ New: explicitly tell backend this captain is going off duty
export const setCaptainOffDuty = (captainId) => {
  if (socket && socket.connected) {
    socket.emit("captain:offDuty", { captainId });
    console.log("🔴 Captain set to OFF duty:", captainId);
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};