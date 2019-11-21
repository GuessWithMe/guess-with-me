import { Handler } from 'express';

import Environment from '@env';

export const loginWithSpotify: Handler = (req, res) => {
  return res.redirect(`${Environment.angularUrl}/game`);
};

export const checkIfAuthed: Handler = (req, res) => {
  return res.json({ authed: true });
};

/**
 * Log out and remove user from the player list
 */
export const logOut: Handler = (req, res) => {
  req.session.destroy(() => {
    return res.status(204).json();
  });
};
