import { Router } from 'express';
const router = Router();

import * as GameController from '@controllers/GameController';
import { isAuthenticated } from '@middleware/AuthMiddleware';

router.get('/status', isAuthenticated, GameController.getStatus);

router.post('/remove-player', isAuthenticated, GameController.removeActiveUser);

router.get('/health', GameController.health);

export default router;
