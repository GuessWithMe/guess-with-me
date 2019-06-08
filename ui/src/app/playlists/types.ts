import { Tracks } from 'src/types/SpotifyPlaylist';

export interface PlaylistItem {
  name: string;
  tracks: Tracks;
  spotifyId: string;
}
