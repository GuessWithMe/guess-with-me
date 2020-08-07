import moment from 'moment';

import { AlbumModel, ArtistModel, PlaylistModel, SongModel, UserModel } from 'models';

class ImportHelper {
  public static async importSong(track: SpotifyApi.TrackObjectFull) {
    let song = await SongModel.findOne({ where: { spotifyId: track.id } });

    const songObject = {
      name: track.name,
      popularity: track.popularity,
      previewUrl: track.preview_url,
      spotifyId: track.id,
      spotifyUrl: track.external_urls.spotify,
    };

    song = song ? await song.update(songObject) : await SongModel.create(songObject);
    return song;
  }

  public static async importArtist(spotifyArtist: SpotifyApi.ArtistObjectSimplified) {
    let artist = await ArtistModel.findOne({
      where: {
        spotifyId: spotifyArtist.id,
      },
    });

    const artistObject = {
      name: spotifyArtist.name,
      spotifyId: spotifyArtist.id,
      spotifyUrl: spotifyArtist.external_urls.spotify,
    };

    artist = artist ? await artist.update(artistObject) : await ArtistModel.create(artistObject);
    return artist;
  }

  public static async createOrUpdatePlaylist(
    user: UserModel,
    spotifyPlaylist: SpotifyApi.SinglePlaylistResponse,
    eligibleTracks: number
  ): Promise<PlaylistModel> {
    let playlist = await PlaylistModel.findOne({
      where: {
        spotifyId: spotifyPlaylist.id,
        userId: user.id,
      },
    });

    const playlistObject = {
      eligibleSongsAtLastImport: eligibleTracks,
      lastImportAt: new Date(),
      spotifyId: spotifyPlaylist.id,
      title: spotifyPlaylist.name,
      totalSongsAtLastImport: spotifyPlaylist.tracks.items.length,
      userId: user.id,
    };

    playlist = playlist ? await playlist.update(playlistObject) : await PlaylistModel.create(playlistObject);
    return playlist;
  }

  public static async importAlbum(
    spotifyAlbum: SpotifyApi.AlbumObjectSimplified & {
      // TODO: update this once https://github.com/DefinitelyTyped/DefinitelyTyped/pull/41309 is merged
      release_date_precision: string;
      release_date: string;
    }
  ) {
    let album = await AlbumModel.findOne({
      where: {
        spotifyId: spotifyAlbum.id,
      },
    });

    let imageUrl: string;
    if (spotifyAlbum.images && spotifyAlbum.images.length > 0) {
      imageUrl = spotifyAlbum.images[1].url;
    }

    let releaseDate: Date;
    switch (spotifyAlbum.release_date_precision) {
      case 'year': {
        releaseDate = moment.utc(spotifyAlbum.release_date, 'YYYY').toDate();
        break;
      }
      case 'month': {
        releaseDate = moment.utc(spotifyAlbum.release_date, 'YYYY-MM').toDate();
        break;
      }
      case 'day': {
        releaseDate = moment.utc(spotifyAlbum.release_date, 'YYYY-MM-DD').toDate();
        break;
      }
    }

    const albumObject = {
      imageUrl,
      name: spotifyAlbum.name,
      releaseDate,
      spotifyId: spotifyAlbum.id,
      spotifyUrl: spotifyAlbum.external_urls.spotify,
    };

    album = album ? await album.update(albumObject) : await AlbumModel.create(albumObject);
    return album;
  }
}

export default ImportHelper;
