import { useEffect } from "react";
import { useRecoilValue } from "recoil";

import services from "services";
import roomAtoms from "recoil/atoms/room";

const useRoomSocket = () => {
  const room = useRecoilValue(roomAtoms.current);

  useEffect(() => {
    const ws = services.socket.getClient();

    if (room) {
      ws.send(
        JSON.stringify({
          action: "JOIN_ROOM",
          payload: { slug: room.slug },
        })
      );

      ws.onmessage = (event) => {
        console.log(event.data);
      };
    }
  }, [room]);
};
export default useRoomSocket;
