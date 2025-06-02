import { User } from "../models/user.model.js";
const callback = async (req, res,next) => {
  try {
    const { clerkId, firstName, lastName,  } = req.body;

    //check if user already exists
    const user = await User.findOne({ clerkId: clerkId });

    //create new user if user doesnt exist
    if (!user) {
      const new_user = await User.create({
        clerkId,
        firstName,
        lastName,
      });
      if (!new_user) {
        throw new Error("Cannot create new user."); //send error message if there was a issue in creating the user
      }
      console.log("New user created.");
      res.status(200).json("New user created.");
      return
    }
    console.log("User already exists.");
    res.status(200).json("User already exists."); //if already exist
  } catch (error) {
    next(error);
  }
};

export {callback};

// try{
//     const auth=req.auth;
//     if(!auth){
//         throw new Error("Not Authenticated.");
//     }
//     res.status(200).json({
//         message:"Authenticated"
//     })
// }
// catch(error){
//     res.status(401).json({
//         message:`${error.message}`
//     })
// }
