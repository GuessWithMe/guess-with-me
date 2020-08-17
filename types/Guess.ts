import { Room } from './Room';
import { Word } from './Word';

export interface Guess {
  artist: {
    word: string;
    correct: boolean;
  }[];
  name: {
    word: string;
    correct: boolean;
  }[];
}
