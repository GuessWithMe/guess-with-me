import { Tracks } from '@types';

export interface PlaylistItem {
  name: string;
  tracks: Tracks;
  spotifyId: string;
}
