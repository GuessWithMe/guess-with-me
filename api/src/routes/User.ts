import { Router } from 'express';
const router = Router();

import * as UserController from 'controllers/UserController';
import { isAuthenticated } from 'middleware/AuthMiddleware';

router.get('/me', isAuthenticated, UserController.getCurrentUser);

export default router;
