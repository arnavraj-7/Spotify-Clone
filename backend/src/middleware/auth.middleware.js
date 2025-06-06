import dotenv from "dotenv";
dotenv.config();
import { clerkClient } from "@clerk/express";
const protectroute = async (req, res, next) => {
  console.log("proctect route trigerred.",req.auth().userId);
  const auth = req.auth();
  const userId = auth.userId;
  if (!userId) {
    res.status(401).json({
      message: "You must be logged-in.",
    });
    return;
  }
  next();
};

const isAdmin = async (req, res, next) => {
  try {
    const auth = req.auth();
    const user = await clerkClient.users.getUser(auth.userId);
    if (user?.primaryEmailAddress?.emailAddress === process.env.ADMIN_EMAIL) {
      next();
      return;
    }
    res.status(401).json({
      message: "You are NOT Admin",
    });
    return;
  } catch (error) {
    next(error);
  }
};

export { protectroute, isAdmin };
