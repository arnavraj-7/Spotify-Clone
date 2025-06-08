import { Server } from "socket.io";
// import {Message} from "../models/message.model.js"

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  const userSocket = new Map(); // {userId:socketId}
  const userActivities = new Map(); //{userID:Activity}

  io.on("connection", (socket) => {
    socket.on("user_connected", (userId) => {
      userSocket.set(userId, socket.id);
      userActivities.set(userId, "online");
    });
  });
  //broadcast to all connected sockets that this user logged in
  io.emit("user_connected", "userId");
  socket.emit("user_online", Array.from(userSockets.keys()));
  io.emit("activities", Array.from(userActivities.entries()));

  io.on("disconnect", () => {
    userSocket.delete(socket.id);
    userActivities.set(socket.id, "offline");
    io.emit("user_disconnected", socket.id);
  });
};
