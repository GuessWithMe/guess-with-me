import { User } from "../../../../types";

export interface GameStore {
  song: {
    artist: string;
    title: string;
  };
}

export type UserStore = User;

export interface Store {
  game: GameStore;
  user: UserStore;
}
