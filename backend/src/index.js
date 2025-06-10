import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

import connectDB from "./controllers/db.controller.js";
import userRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js";
import songRoute from "./routes/song.route.js";
import albumRoute from "./routes/album.route.js";
import statsRoute from "./routes/stats.route.js";
import authRoute from "./routes/auth.route.js";
import chatRoute from "./routes/chat.route.js"
import fileUpload from "express-fileupload";
import path from "path";
import { handleError } from "./middleware/error.middleware.js";
import { createServer } from "http";
import { initializeSocket } from "./lib/socket.js";
import fs from "fs";
import cron from "node-cron";



dotenv.config();

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);
initializeSocket(httpServer)

const frontendURL =process.env.FRONTEND_URL || "http://localhost:3000";


//Global Middlewares
app.use(cors({
  origin:frontendURL,
  credentials:true
}));
app.use(express.json());
app.use(clerkMiddleware({
  secretKey:process.env.CLERK_SECRET_KEY
}));
 //it adds .auth to req object
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, //10mb max file size
    },
  })
);

// cron jobs
const tempDir = path.join(process.cwd(), "tmp");
cron.schedule("0 12 * * 0", () => {
	if (fs.existsSync(tempDir)) {
		fs.readdir(tempDir, (err, files) => {
			if (err) {
				console.log("error", err);
				return;
			}
			for (const file of files) {
				fs.unlink(path.join(tempDir, file), (err) => {});
			}
		});
	}
});




//Routes

app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/song", songRoute);
app.use("/api/album", albumRoute);
app.use("/api/stats", statsRoute);
app.use("/api/auth", authRoute);
app.use("/api/chat", chatRoute);

app.use(handleError); //handles the errors from all routes

connectDB()
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error:", error);
  });
