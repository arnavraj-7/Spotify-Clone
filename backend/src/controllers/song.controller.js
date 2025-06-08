import { Song } from "../models/song.model.js";

const getSongs = async (req, res, next) => {
  try {
    const songs = await Song.find();
    if (!songs) {
      res.status(401).json({ message: "Cannot get Songs." });
      return;
    }
    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};

const getSongbyId = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const song = await Song.findById(_id);
    if (!song) {
      res.status(401).json({ message: "Cannot get Song." });
      return;
    }
    res.status(200).json(song);
  } catch (error) {
    next(error);
  }
};

const getFeaturedSongs = async (req, res, next) => {
  try {
    //fetch 6 random songs using aggregation pipelines
    const featured = await Song.aggregate([
      { $sample: { size: 6 } },
      {
        $project: {
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    if (!featured) {
      res.json({
        message: "Cannot get Featured Songs.",
      });
    }
    // console.log("sending featured",featured);
    res.json(featured);
  } catch (error) {
    next(error);
  }
};
const getMadeforyou = async (req, res, next) => {
  try {
    //fetch 4 random songs using aggregation pipelines
    const madeforyou = await Song.aggregate([
      { $sample: { size: 6 } },
      {
        $project: {
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    if (!madeforyou) {
      res.json({
        message: "Cannot get madeforyou Songs.",
      });
    }
    // console.log("sending madeforyou");
    res.json(madeforyou);
  } catch (error) {
    next(error);
  }
};

const getTrendingSongs = async (req, res, next) => {
  try {
    //fetch 4 random songs using aggregation pipelines
    const trending = await Song.aggregate([
      { $sample: { size: 4 } },
      {
        $project: {
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    if (!trending) {
      res.status(401).json({
        message: "Cannot get Trending Songs.",
      });
    }
    // console.log("sending trending");

    res.status(200).json(trending);
  } catch (error) {
    next(error);
  }
};
export {
  getSongs,
  getSongbyId,
  getFeaturedSongs,
  getMadeforyou,
  getTrendingSongs,
};
