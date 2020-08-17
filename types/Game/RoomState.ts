import { Room } from '../Room';
import { Song } from '../Song';
import { Artist } from '../Artist';

export enum Status {
  PAUSE = 'pause',
  SONG_PLAYING = 'song-playing',
}

type RoomState = {
  info: Room;
  guess: {
    artists: Artist[];
    name: Song['name'];
    previewUrl: Song['previewUrl'];
  };
  status: Status;
  timeLeft: number;
};

export default RoomState;
