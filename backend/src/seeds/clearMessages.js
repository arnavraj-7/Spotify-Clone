import mongoose from "mongoose";
import dotenv from "dotenv";
import { Message } from "../models/message.model.js";

dotenv.config();

async function clearMessages() {
  try {
    // First, connect to the DB and await the connection
    await mongoose.connect(process.env.DB_URL);

    // Now perform the deletion
    const res = await Message.deleteMany({});
    console.log("Messages cleared.", res);
  } catch (error) {
    console.log("Error while clearing messages:", error);
  } finally {
    // Ensure disconnection happens even if there’s an error
    await mongoose.disconnect();
  }
}

clearMessages();
