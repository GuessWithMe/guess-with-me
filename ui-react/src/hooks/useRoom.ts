import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import roomAtoms from "recoil/atoms/room";

import { Room } from "commonTypes";
import RoomState from "commonTypes/Game/RoomState";

import services from "services";

import config from "config";
import appAtoms from "recoil/atoms/app";

interface RoomJoinAction {
  type: "JOIN_ROOM_SOCKET";
  payload: {
    room: RoomState;
  };
}

interface RoomLeaveAction {
  type: "ROOM_LEAVE_RES";
  payload: {
    roomLeft: Room["slug"];
  };
}

type RoomSocketAction = RoomJoinAction | RoomLeaveAction;

const useRoom = () => {
  const setRoom = useSetRecoilState(roomAtoms.current);
  const setAppTitle = useSetRecoilState(appAtoms.title);
  const { slug } = useParams();

  useEffect(() => {
    const ws = new WebSocket(config.wsUrl);

    ws.onmessage = (event) => {
      const data: RoomSocketAction = JSON.parse(event.data);

      switch (data.type) {
        case "JOIN_ROOM_SOCKET": {
          setRoom(data.payload.room);
          setAppTitle(data.payload.room.title);
          break;
        }
        case "ROOM_LEAVE_RES": {
          console.log(data.payload.roomLeft);
          break;
        }
      }
    };

    ws.onopen = () => {
      services.roomSocket.join(ws, slug);
    };

    return () => {
      console.log("CLOSE HERE ?");
      ws.close();
    };
  }, [slug]);
};
export default useRoom;
