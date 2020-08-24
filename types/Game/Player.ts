import { User } from '../User';

export interface GuessStatus {
  titleCorrect?: boolean;
  artistCorrect?: boolean;
  avatar: string;
  username: string;
}

type UserOmitted = Pick<User, 'id' | 'spotifyUsername' | 'spotifyImageUrl'>;

export type PlayerOmitted = UserOmitted & GuessStatus;
export type Player = User & GuessStatus;
