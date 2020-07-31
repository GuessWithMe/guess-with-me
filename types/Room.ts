import { Playlist } from './Playlist';

export interface Room {
  id: string;
  title: string;
  password?: string;
  playlists: Playlist[];
  color?: string;
  slug: string;
}
