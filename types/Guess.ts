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
