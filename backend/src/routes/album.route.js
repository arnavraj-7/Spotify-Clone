import { Router } from "express";

import { getAlbums, getAlbumbyId } from "../controllers/album.controller.js";

const router = Router();

//middleware for user auth
// router.use(protectroute);

router.get("/", getAlbums);
router.get("/:_id", getAlbumbyId);

export default router;
