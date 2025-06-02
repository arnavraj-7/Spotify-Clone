import cloudinary from "../lib/cloudinary.js";
import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";

//helper function for cloudinary upload

const uploadtoCloudinary = async (file) => {
  try {
    const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return uploaded.secure_url;
  } catch (error) {
    console.log("Error in uploading to Cloudinary ", error);
    throw new Error("Error in uploading to Cloudinary");
  }
};

const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      res.status(400).json({
        message: "Please upload required files.",
      });
      return;
    }
    const { title, artist, albumId, duration } = req.body; //extract data from request
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;
    //save to cloudinary

    const audioUrl = await uploadtoCloudinary(audioFile);
    const imageUrl = await uploadtoCloudinary(imageFile);
    const new_song = await Song.create({
      title,
      artist,
      albumId: albumId || "",
      imageUrl,
      audioUrl,
      duration,
    });

    //if song belongs to an album
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: new_song._id },
      });
    }
    if (!new_song) {
      throw new Error("Cannot Upload Song.");
    }
    res.status(201).json({ new_song }); //send back the data to frontend to use,ensures first successful upload then use
    return;
  } catch (error) {
    next(error);
  }
};

const deleteSong = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const deleted_song = await Song.findByIdAndDelete(_id);
    if (!deleted_song) {
      return res.status(404).json({ message: "Song not found." });
    }
    if (deleted_song.albumId) {
      await Album.findByIdAndUpdate(deleted_song.albumId, {
        $pull: { songs: deleted_song._id },
      });
    }
    res.status(200).json({
      message: "Song deleted successfully.",
    });
  } catch (error) {
    console.log("Error in deletion.", error);
    next(error);
  }
};

const createAlbum = async (req, res, next) => {
  try {
    //initial check for all fields
    if (!req.file.imageFile || !req.body.title || !req.body.artist) {
      res.status(400).json({
        message: "Send all the required fields.",
      });
      return;
    }
    //extract data from req
    const { title, releaseDate, artist } = req.body;
    const imageFile = req.file.imageFile;
    //upload to cloudinary
    const imageUrl = await uploadtoCloudinary(imageFile);
    const new_album = await Album.create({
      title,
      artist,
      imageUrl,
      releaseDate,
      songs: [],
    });
    res.status(200).json(new_album); //send to frontend to use
  } catch (error) {
    console.log("Error in creating album.", error);
    next(error);
  }
};

const deleteAlbum = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const deleted_album = await Album.findByIdAndDelete(_id);
    if (!deleted_album) {
      return res.status(404).json({ message: "Album not found." });
    }
    await Song.deleteMany({ albumId: _id });
    res.status(200).json({
      message: "Album deleted successfully.",
    });
  } catch (error) {
    console.log("Error in deletion.", error);
    next(error);
  }
};

const adminDashboard = (req, res, next) => {
  res.status(200).json({ message: "Welcome,Admin", admin: true });
};

export { createSong, deleteSong, createAlbum, deleteAlbum, adminDashboard };
