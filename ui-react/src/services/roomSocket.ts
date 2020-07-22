import services from "services";
import { Room } from "commonTypes";

class RoomSocketService {
  public join = (ws: WebSocket, slug: Room["slug"]) => {
    ws.send(
      JSON.stringify({
        type: "JOIN_ROOM",
        payload: { slug },
      })
    );
  };

  public leave = (slug: Room["slug"]) => {
    const ws = services.socket.open();
    ws.send(
      JSON.stringify({
        type: "LEAVE_ROOM",
        payload: { slug },
      })
    );
  };
}

export default new RoomSocketService();
