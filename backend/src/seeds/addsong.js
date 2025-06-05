import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { config } from "dotenv";

config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    // First, create all songs
    const createdSongs = await Song.insertMany([{
      title: "Wavy",
      artist: "Karan Aujla",
      imageUrl: "/cover-images/19.jpeg",
      audioUrl: "/songs/19.mp3",
      plays: Math.floor(Math.random() * 5000),
      duration: 161, // 2:41
    },
{
     title: "Softly",
      artist: "Karan Aujla",
      imageUrl: "/cover-images/20.jpeg",
      audioUrl: "/songs/20.mp3",
      plays: Math.floor(Math.random() * 5000),
      duration: 155, // 2:35
},
{
    title: "52 Bars",
      artist: "Karan Aujla",
      imageUrl: "/cover-images/21.jpeg",
      audioUrl: "/songs/21.mp3",
      plays: Math.floor(Math.random() * 5000),
      duration: 214, // 3:34
},
{
    title: "Sifar Safar",
      artist: "Karan Aujla",
      imageUrl: "/cover-images/22.jpeg",
      audioUrl: "/songs/22.mp3",
      plays: Math.floor(Math.random() * 5000),
      duration: 180, // 3:00
},

]);
 console.log("Songs added.")
  } catch (error) {
    res.json({ message: `${error.message}` });
  }
};

seedDatabase();