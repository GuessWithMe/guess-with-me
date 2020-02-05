import { Room } from 'models';
import redis from 'config/redis';
import { RoomStatus } from '@types';
import { RoomService } from 'services';

class RoomSocketService {
  public static allRooms = async () => {
    const rooms: Record<Room['slug'], RoomStatus> = JSON.parse(await redis.get('rooms'));
    return rooms;
  };

  public slug: Room['slug'];

  constructor(slug: Room['slug']) {
    this.slug = slug;
  }

  public join = async () => {
    const rooms: Record<Room['slug'], RoomStatus> = JSON.parse(await redis.get('rooms'));

    return rooms[this.slug];
  };

  public status = async () => {
    const room = await redis.get('rooms', `["${this.slug}"]`);
    return JSON.parse(room);
  };

  public setStatus = async (roomId: Room['slug'], status: RoomStatus) => {
    // const rooms: Record<Room['id'], RoomStatus> = JSON.parse(await redis.set('rooms'));
    // rooms[] = status;

    await redis.set('rooms', roomId, status);
  };
}

export default RoomSocketService;
