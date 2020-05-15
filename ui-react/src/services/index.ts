import RoomService from "./room";
import SocketService from "./socket";
import UserService from "./user";

const services = {
  room: RoomService,
  socket: SocketService,
  user: UserService,
};

export default services;
