import { SpotifyService } from '@services';
import { Handler, Response } from 'express';

/**
 * Retreives users playlists
 */
export const getPlaylists: Handler = async (req, res): Promise<Response> => {
  try {
    const spotifyPlaylists = await new SpotifyService().getUserPlaylists(res.locals.user);
    const playlists = await res.locals.user.$get('playlists');
    return res.json({
      playlists,
      spotifyPlaylists
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

/**
 * Retreives users imported playlists
 */
export const getImportedPlaylists: Handler = async (req, res): Promise<Response> => {
  try {
    const playlists = await res.locals.user.$get('playlists');
    return res.json({ playlists });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
