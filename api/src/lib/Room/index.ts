import { Sequelize, Op } from 'sequelize';

import { User, Artist, Room as RoomI, Song, Status } from '@types';
import { SongModel, ArtistModel } from 'models';
import { RoomService } from 'services';

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
  previewUrl: string;
}

const SONG_LENGHT = 10;

class Room {
  public players: Player[] = [];

  private timeLeft: number;
  private timer: NodeJS.Timeout;
  private status: Status;
  private guess: Guess;
  private song: Song;

  constructor(private slug: RoomI['slug']) {
    this.timeLeft = SONG_LENGHT;
    this.status = Status.SONG_PLAYING;
    this.timer = setInterval(() => {
      if (this.timeLeft === 0) {
        if (this.status === Status.SONG_PLAYING) {
          console.log('send pause');

          this.pause();
        } else if (this.status === Status.PAUSE) {
          console.log('send next song');

          // Send next song;
          this.nextSong();
          this.timeLeft = SONG_LENGHT;
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

  public nextSong = async () => {
    const { artists, name, previewUrl } = await SongModel.findOne({
      include: [ArtistModel],
      where: {
        previewUrl: {
          [Op.ne]: null,
        },
      },
      order: [Sequelize.fn('RANDOM')],
    });

    this.guess = {
      artists,
      name,
      previewUrl,
    };
  };

  public pause = async () => {
    this.status = Status.PAUSE;
    this.timeLeft = 5;

    new RoomService().sendStatus(this.slug, this.getStatus());
  };

  public getStatus = () => {
    return {
      players: this.players,
      guess: this.guess,
      timeLeft: this.timeLeft,
      status: this.status,
    };
  };
}

export default Room;
