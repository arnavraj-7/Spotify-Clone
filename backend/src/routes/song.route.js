import { Router } from "express";
import {
  getFeaturedSongs,
  getMadeforyou,
  getSongbyId,
  getSongs,
} from "../controllers/song.controller.js";
import { protectroute, isAdmin } from "../middleware/auth.middleware.js";

const router = Router();

//middleware for user auth
// router.use(protectroute);

router.get("/", protectroute, isAdmin, getSongs);
router.get("/:id", getSongbyId);
router.get("/featured", getFeaturedSongs);
router.get("/made-for-you",getMadeforyou);
router.get("/trending", getFeaturedSongs);

export default router;
