import { Router } from 'express';
import passport from 'passport';

import * as AuthController from 'controllers/AuthController';

import { isAuthenticated } from 'middleware/AuthMiddleware';

import environment from 'config/environment';

const router = Router();

router.get(
  '/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: `${environment.uiUrl}/auth/login` }),
  AuthController.loginWithSpotify
);

router.get('/spotify', passport.authenticate('spotify'));

router.get('/check', isAuthenticated, AuthController.checkIfAuthed);

router.get('/logout', AuthController.logOut);

export default router;
