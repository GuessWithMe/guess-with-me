import services from "services";
import { Room } from "commonTypes";

class RoomSocketService {
  public joinRoom = (slug: Room["slug"]) => {
    const ws = services.socket.getClient();
    ws.send(
      JSON.stringify({
        action: "JOIN_ROOM",
        payload: { slug },
      })
    );
  };
}

export default new RoomSocketService();
