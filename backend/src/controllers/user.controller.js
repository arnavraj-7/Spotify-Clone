import { User } from "../models/user.model.js";

const getUsers = async (req, res,next) => {
  try {
    const currentUserId=req.auth.userId
    const users = await User.find({clerkId:{$ne:currentUserId}});
    if (!users) {
      res.status(401).json({ message: "Cannot get Users." });
      return;
    }
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export {getUsers};