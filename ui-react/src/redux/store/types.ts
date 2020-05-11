import { User, Room } from "../../../../types";

export interface GameState {
  song: {
    artist: string;
    title: string;
  };
}

export type UserState = User | null;

export type AppState = {
  title: string;
};

export type RoomsState = {
  list: Room[];
};

export interface State {
  game: GameState;
  user: UserState;
  app: AppState;
  rooms: RoomsState;
}
