import { Word } from "./Word";

export interface Guess {
  artist: Word[];
  title: Word[];
  artistCorrect: boolean;
  titleCorrect: boolean;
}
