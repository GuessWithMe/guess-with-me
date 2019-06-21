import { Song } from "./Song";

export interface RoomStatus {
  isPaused: boolean;
  previousSong: Song;
  currentSong: Song;
  timeLeft: number;
}
