import { AlbumModel, ArtistModel, PlaylistModel, SongModel, SongArtist, SongPlaylist } from 'models';
import { Handler, Response } from 'express';

export const truncateDatabase: Handler = async (req, res): Promise<Response> => {
  try {
    await SongArtist.destroy({ where: {} });
    await SongPlaylist.destroy({ where: {} });
    await SongModel.destroy({ where: {} });
    await ArtistModel.destroy({ where: {} });
    await AlbumModel.destroy({ where: {} });
    await PlaylistModel.destroy({ where: {} });

    return res.status(204).json();
  } catch (err) {
    console.log(err);
  }
};
