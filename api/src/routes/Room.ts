import { Router } from 'express';
const router = Router();

import RoomController from '@controllers/RoomController';
import { isAuthenticated } from '@middleware/AuthMiddleware';

router.post('/', isAuthenticated, RoomController.create);
router.get('/', isAuthenticated, RoomController.all);

export default router;
