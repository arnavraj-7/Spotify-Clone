import {Router} from "express";
import {callback} from '../controllers/auth.controller.js';
import { protectroute } from "../middleware/auth.middleware.js";


const router = Router();

router.post("/callback",protectroute,callback);







export default router;