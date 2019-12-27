import { Album } from './Album';
import { Artist } from './Artist';

export interface Song {
  id: number;
  previewUrl: string;
  album: Album;
  name: string;
  artists: Artist[];
}
