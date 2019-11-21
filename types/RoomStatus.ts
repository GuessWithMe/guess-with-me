import { Song } from "./Song";

export interface RoomStatus {
  isPaused: boolean;
  currentSong: Song;
  timeLeft: number;
}
