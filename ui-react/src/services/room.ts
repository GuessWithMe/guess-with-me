import config from "config";

import { Room } from "commonTypes";

import http from "lib/api";

class RoomService {
  public get = async (slug: Room["slug"]) => {
    const res = await http<{ room: Room }>(`${config.apiUrl}/rooms/${slug}`);
    return res.room;
  };

  public list = async () => {
    const res = await http<{ rooms: Room[] }>(`${config.apiUrl}/rooms`);
    return res.rooms;
  };
}

export default new RoomService();
