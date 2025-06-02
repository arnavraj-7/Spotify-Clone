import {Router} from 'express';
import { protectroute } from '../middleware/auth.middleware.js';
import { getUsers } from '../controllers/user.controller.js';

const router=Router();


router.get('/',protectroute,getUsers)


export default router;