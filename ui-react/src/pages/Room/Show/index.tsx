import React, { memo } from "react";

import { useRecoilValue } from "recoil";

import roomAtoms from "recoil/atoms/room";

import useRoom from "hooks/useRoom";
import useRoomSocket from "hooks/useRoomSocket";

const RoomShow = memo(() => {
  useRoom();
  useRoomSocket();
  const room = useRecoilValue(roomAtoms.current);

  return <></>;
});

export default RoomShow;
