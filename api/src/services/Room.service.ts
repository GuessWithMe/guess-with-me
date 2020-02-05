import redis from 'config/redis';
import { Room } from 'models';

class RoomService {
  public async status(slug: Room['slug']) {
    const res = await redis.get('rooms');
    return res;
  }
}

export default RoomService;
