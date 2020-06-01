import { Room } from './Room';
import { Word } from './Word';

export interface Guess {
  artist: Word[];
  name: Word[];
  artistCorrect: boolean;
  nameCorrect: boolean;
  room?: Room['slug'];
}
