import { Router } from "express";
import { isAdmin, protectroute } from "../middleware/auth.middleware.js";
import {
  adminDashboard,
  createAlbum,
  createSong,
  deleteAlbum,
  deleteSong,
} from "../controllers/admin.controller.js";

const router = Router();

//using middlewares for all routes
router.use(protectroute,isAdmin);


router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);
router.post("/album", createAlbum);
router.delete("/album/:id", deleteAlbum);
router.get("/dashboard", adminDashboard);

export default router;
