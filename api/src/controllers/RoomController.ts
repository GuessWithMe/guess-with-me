import { Handler, Response } from 'express';

import { Playlist, Room } from 'models';

/**
 * Retrieves a single room
 */
const get: Handler = async (req, res): Promise<Response> => {
  try {
    const room = await Room.findOne({ where: { slug: req.params.slug } });
    return res.json({
      room
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

/**
 * Creates a room
 */
const create: Handler = async (req, res): Promise<Response> => {
  try {
    const { playlists, ...roomObject } = req.body;
    let room = await Room.create(roomObject);
    const playlistIds = playlists.map((p: Playlist) => p.id);
    room.$set('playlists', playlistIds);
    room = await room.save();
    return res.json(room);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

/**
 * Retrieves all rooms
 */
const all: Handler = async (req, res): Promise<Response> => {
  try {
    const rooms = await Room.findAll();
    return res.json({ rooms });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export default { all, create, get };
