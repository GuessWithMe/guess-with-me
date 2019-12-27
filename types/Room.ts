import { Playlist } from './Playlist';

export interface Room {
  id: number;
  title: string;
  password: string;
  playlists: Playlist[];
  color?: string;
}
