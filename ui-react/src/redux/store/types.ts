import { User } from "../../../../types";

export interface GameState {
  song: {
    artist: string;
    title: string;
  };
}

export type UserState = User | null;

export interface State {
  game: GameState;
  user: UserState;
}
