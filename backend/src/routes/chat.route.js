import { Router } from "express";
import { getMessages } from "../controllers/chat.controller.js";
import { protectroute } from "../middleware/auth.middleware.js";

const router = Router();
router.get("/:r_id",protectroute,getMessages);
// router.post('/:id/mark-seen',markasDelivered);


export default router;