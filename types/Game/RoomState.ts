import { Room } from '../Room';
import { Song } from '../Song';

export enum Status {
  PAUSE = 'pause',
  SONG_PLAYING = 'song-playing',
}

type RoomState = {
  info: Room;
  song: Song;
  status: Status;
  timeLeft: number;
};

export default RoomState;
