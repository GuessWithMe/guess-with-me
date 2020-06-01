import PlaylistService from "./playlist";
import RoomService from "./room";
import RoomSocketService from "./roomSocket";
import SocketService from "./socket";
import UserService from "./user";

const services = {
  playlist: PlaylistService,
  room: RoomService,
  roomSocket: RoomSocketService,
  socket: SocketService,
  user: UserService,
};

export default services;
