import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { config } from "dotenv";

config();


const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    // First, create all songs
    const createdAlbum = await Album.insertOne(
     {title: "Making Memories",
				artist: "Karan Aujla",
				imageUrl: "/albums/5.jpg",
				releaseYear: 2023,
				songs:[]}

);
 console.log("Playlist added.")
  } catch (error) {
    console.log("Error in seeding database:", error);
  }
};

seedDatabase();