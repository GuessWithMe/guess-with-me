import { User } from '../User';

interface GuessStatus {
  titleCorrect?: boolean;
  artistCorrect?: boolean;
}

type UserOmitted = Pick<User, 'id' | 'spotifyUsername' | 'spotifyImageUrl'>;

export type PlayerOmitted = UserOmitted & GuessStatus;
export type Player = User & GuessStatus;
