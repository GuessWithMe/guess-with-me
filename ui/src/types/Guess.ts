import { Word } from '@t';

export interface Guess {
  artist: Word[];
  title: Word[];
  artistCorrect: boolean;
  titleCorrect: boolean;
}
