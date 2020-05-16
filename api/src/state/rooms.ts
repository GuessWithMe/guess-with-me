import { Room } from 'models';
import { User } from '@types';

interface Player {
  avatar: string;
  username: string;
  artistCorrect: boolean;
  titleCorrect: boolean;
  points: number;
}

interface RoomState {
  players: Player[];
  guess: {
    artist: string;
    title: string;
  };
}

class RoomsState {
  public rooms: Record<Room['slug'], RoomState> = {
    selection: {
      players: [],
      guess: {
        artist: 'Linkin Park',
        title: 'Shadow of the Day'
      }
    }
  };

  public onPlayerJoin = (slug: Room['slug'], user: User) => {
    const room = { ...this.rooms[slug] };

    room.players.push({
      avatar: user.spotifyImageUrl,
      username: user.spotifyUsername,
      artistCorrect: false,
      titleCorrect: false,
      points: 0
    });

    this.rooms = {
      ...this.rooms,
      slug: room
    };
  };
}

export default new RoomsState();
