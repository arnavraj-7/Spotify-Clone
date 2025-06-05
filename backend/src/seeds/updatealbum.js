import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { config } from "dotenv";

config();


const seedDatabase = async () => {
  try {
    const albumId = "6841558837a9695dc82f94a7";
    const artistName = "Karan Aujla"
    await mongoose.connect(process.env.DB_URL);

  // Step 1: Find all songs by the artist
    const songs = await Song.find({ artist: artistName });

    // Step 2: Extract their _id's
    const songIds = songs.map(song => song._id);

    // Step 3: Add them to the album's `songs` array (no duplicates)
    await Album.findByIdAndUpdate(
      albumId,
      { $addToSet: { songs: { $each: songIds } } }
    );
 console.log("Playlist added.")
  } catch (error) {
    console.log("Error in seeding database:", error);
  }
};

seedDatabase();