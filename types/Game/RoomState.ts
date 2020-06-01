import { Room } from 'commonTypes';

interface Player {
  avatar: string;
  username: string;
  artistCorrect: boolean;
  titleCorrect: boolean;
  points: number;
}

type RoomState = Room & {
  players: Player[];
  guess: {
    artist: string;
    title: string;
  };
};

export default RoomState;
