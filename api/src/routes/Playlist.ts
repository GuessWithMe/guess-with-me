import { Router } from 'express';
const router = Router();

import * as PlaylistController from '@controllers/PlaylistController';
import { isAuthenticated } from '@middleware/AuthMiddleware';

router.get('/', isAuthenticated, PlaylistController.getPlaylists);

export default router;
