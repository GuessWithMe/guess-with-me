import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import roomAtoms from "recoil/atoms/room";

import { Room, Player } from "commonTypes";
import RoomState from "commonTypes/Game/RoomState";

import services from "services";

import config from "config";
import appAtoms from "recoil/atoms/app";

interface RoomJoinAction {
  type: "JOIN_ROOM_SOCKET";
  payload: {
    room: RoomState & { players: Player[] };
  };
}

interface RoomLeaveAction {
  type: "ROOM_LEAVE_RES";
  payload: {
    roomLeft: Room["slug"];
  };
}

interface RoomStatusUpdateAction {
  type: "ROOM_STATUS_UPDATE";
  payload: {
    status: object;
  };
}

type RoomSocketAction =
  | RoomJoinAction
  | RoomLeaveAction
  | RoomStatusUpdateAction;

const useRoom = () => {
  const setRoom = useSetRecoilState(roomAtoms.current);
  const setPlayers = useSetRecoilState(roomAtoms.players);
  const setAppTitle = useSetRecoilState(appAtoms.title);
  const { slug } = useParams();

  useEffect(() => {
    const ws = new WebSocket(config.wsUrl);

    ws.onmessage = (event) => {
      const data: RoomSocketAction = JSON.parse(event.data);
      console.warn(data.type);
      console.warn(data.payload);

      switch (data.type) {
        case "JOIN_ROOM_SOCKET": {
          const { players, ...rest } = data.payload.room;

          setRoom(rest);
          setPlayers(players);
          setAppTitle(data.payload.room.info.title);
          break;
        }
        case "ROOM_STATUS_UPDATE": {
          // setRoom(data.payload.status);
          break;
        }
        case "ROOM_LEAVE_RES": {
          break;
        }
      }
    };

    ws.onopen = () => {
      services.roomSocket.join(ws, slug);
    };

    return () => {
      setRoom(null);
      ws.close();
    };
  }, [slug, setAppTitle, setRoom, setPlayers]);
};
export default useRoom;
