import {Router} from 'express';
import { protectroute,isAdmin } from '../middleware/auth.middleware.js';
import getStats from '../controllers/stats.controller.js';

const router=Router();

router.get('/',protectroute,isAdmin,getStats)


export default router;