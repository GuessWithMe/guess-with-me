import { Room } from './Room';
import { Word } from '@types';

export interface Guess {
  artist: Word[];
  title: Word[];
  artistCorrect: boolean;
  titleCorrect: boolean;
  room?: Room['slug'];
}
