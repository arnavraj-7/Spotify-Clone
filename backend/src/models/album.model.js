import mongoose from "mongoose";

const AlbumSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    artist:{
        type:String,
        required:true
    },
    songs:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Song"
    },
     imageUrl:{
        type:String,
        required:true
    },
    releaseYear:{
        type:Number,
    }
},{timestamps:true})

export const Album = mongoose.model("Album",AlbumSchema) ;