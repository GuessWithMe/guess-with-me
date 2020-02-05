import { Router } from 'express';
const router = Router();

import * as GameController from 'controllers/GameController';

router.get('/health', GameController.health);

export default router;
