// import { Room } from 'models';
import { User, Artist, Room } from '@types';
import RoomLib from 'lib/Room';

interface Player {
  avatar: string;
  username: string;
  artistCorrect: boolean;
  titleCorrect: boolean;
  points: number;
}

class RoomsState {
  public rooms: Record<Room['slug'], RoomLib> = {};

  public onPlayerJoin = async (slug: Room['slug'], user: User) => {
    if (!this.rooms[slug]) {
      this.rooms[slug] = new RoomLib(slug);
      await this.rooms[slug].nextSong();
    }

    this.rooms[slug].addPlayer(user);
    return this.rooms[slug].getStatus();
  };

  public onPlayerLeave = (slug: Room['slug'], user: User) => {
    this.rooms[slug].removePlayer(user);
    return this.rooms[slug].getStatus();
  };
}

export default new RoomsState();
