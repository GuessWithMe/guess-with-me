import { Router } from 'express';
import passport from 'passport';

import * as AuthController from '@controllers/AuthController';

import { isAuthenticated } from '@middleware/AuthMiddleware';

const router = Router();

router.get(
  '/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/auth/login' }),
  AuthController.loginWithSpotify
);

router.get('/spotify', passport.authenticate('spotify'));

router.get('/check', isAuthenticated, AuthController.checkIfAuthed);

router.get('/logout', AuthController.logOut);

export default router;
