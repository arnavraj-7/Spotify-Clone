import { Song} from "../models/song.model.js";
import { User } from "../models/user.model.js";
import {Album} from "../models/album.model.js"

const getStats = async (req, res, next) => {
  try {
    // const Total_Songs= await Song.countDocuments();
    // const Total_Albums=await Album.countDocuments();
    // const Total_Users=await User.countDocuments();

    //more optimised version
    const [Total_Songs,Total_Albums,Total_Users]=await Promise.all([
        Song.countDocuments(),
        Album.countDocuments(),
        User.countDocuments()
    ])
      const result = await Song.aggregate([
      {
        $group: {
          _id: "$artist" // group by artist
        }
      },
      {
        $count: "uniqueArtistsCount" // count how many groups
      }
    ]);

    const Total_Artists = result[0]?.uniqueArtistsCount || 0;
    console.log(`[${new Date().toISOString()}] Stats fetched successfully.`);
    res.status(200).json({
        Total_Songs,
        Total_Albums,
        Total_Artists,
        Total_Users
    })
  } catch (error) {
    next(error);
  }
};
export default getStats;
