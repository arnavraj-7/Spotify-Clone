import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    clerkId:{
        type:String,
        required:true,
        unique:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    likeId:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Song"
    },

},{timestamps:true})

export const User=mongoose.model("User",UserSchema);