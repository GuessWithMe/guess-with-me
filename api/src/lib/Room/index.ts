import { User, Artist } from '@types';

enum RoomStatus {
  PAUSE,
  SONG_PLAYING
}

interface Player {
  avatar: string;
  username: string;
  artistCorrect: boolean;
  titleCorrect: boolean;
  points: number;
}

class Room {
  public players: Player[] = [];

  private timeLeft: number;
  private timer: NodeJS.Timeout;
  private status: RoomStatus;
  private guess: {
    artists: Artist[];
    name: string;
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
      points: 0
    });
  };

  public removePlayer = (user: User) => {
    const index = this.players.findIndex(player => player.username === user.spotifyUsername);
    console.log(index);

    this.players.splice(index, 1);
    return this.getStatus();
  };

  public getStatus = () => {
    return {
      players: this.players,
      guess: this.guess,
      bla: true
    };
  };
}

export default Room;
