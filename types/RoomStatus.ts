import { PlayerOmitted } from './Game/Player';
import { Song } from './Song';

export interface RoomStatus {
  song: Song;
  prevSongs: Song[];
  players: Record<string, PlayerOmitted>;
}

export interface RoomStatusResponse extends RoomStatus {
  startTime: Date;
}
