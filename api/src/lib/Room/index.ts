import { User, Artist } from '@types';
import { Song } from 'models';

enum RoomStatus {
  PAUSE,
  SONG_PLAYING,
}

interface Player {
  avatar: string;
  username: string;
  artistCorrect: boolean;
  titleCorrect: boolean;
  points: number;
}

interface Guess {
  artists: Partial<Artist>[];
  name: string;
}

class Room {
  public players: Player[] = [];

  private timeLeft: number;
  private timer: NodeJS.Timeout;
  private status: RoomStatus;
  private guess: Guess = {
    artists: [{ name: 'Linkin Park' }],
    name: 'Shadow of the day',
  };

  constructor() {
    this.timeLeft = 30;
    this.status = RoomStatus.SONG_PLAYING;
    this.timer = setInterval(() => {
      if (this.timeLeft === 0) {
        if (this.status === RoomStatus.SONG_PLAYING) {
          this.status = RoomStatus.PAUSE;
          this.timeLeft = 5;
          // End song
        } else if (this.status === RoomStatus.PAUSE) {
          // Send next song;
          this.timeLeft = 30;
        }

        return;
      }

      this.timeLeft -= 1;
    }, 1000);
  }

  public addPlayer = (user: User) => {
    this.players.push({
      avatar: user.spotifyImageUrl,
      username: user.spotifyUsername,
      artistCorrect: false,
      titleCorrect: false,
      points: 0,
    });
  };

  public removePlayer = (user: User) => {
    const index = this.players.findIndex((player) => player.username === user.spotifyUsername);
    this.players.splice(index, 1);
    return this.getStatus();
  };

  public nextSong = () => {
    return Song.findOne({ where: {} });
  };

  public getStatus = () => {
    return {
      players: this.players,
      guess: this.guess,
      timeLeft: this.timeLeft,
    };
  };
}

export default Room;
