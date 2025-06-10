import mongoose from "mongoose";


const MessageSchema = new mongoose.Schema({
    senderId:{
        type:String,
        required:true
    },
    receiverId:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
     delivered: {
        type: Boolean,
        default: false
    },
   seen: {
     type: Boolean,
     default: false
   }
},{timestamps:true})

export const Message = mongoose.model("Message",MessageSchema);