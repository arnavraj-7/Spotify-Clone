import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    artist:{
        type:String,
        required:true
    },
    albumId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Album"
    },
     imageUrl:{
        type:String,
        required:true
    },
    audioUrl:{
        type:String,
        required:true,
    },
    duration:{
        type:Number,
        required:true,
    }
},{timestamps:true})

export const Song = mongoose.model("Song",SongSchema) ;