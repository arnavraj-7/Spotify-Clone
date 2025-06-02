import { Album } from "../models/album.model.js";

const getAlbums = async (req, res,next) => {
  try {
    const albums = await Album.find();
    if (!albums) {
      res.status(401).json({ message: "Cannot get Albums." });
      return;
    }
    res.status(200).json(albums);
  } catch (error) {
    next(error);
  }
};
const getAlbumbyId = async (req,res,next)=>{
  
  try {
    const {_id}=req.params
    const album = await Album.findById(_id).populate("songs");
    if (!album) {
      res.status(401).json({ message: "Cannot get Album." });
      return;
    }
    res.status(200).json(album);
  } catch (error) {
    next(error);
  }
};


export  {getAlbums,getAlbumbyId};