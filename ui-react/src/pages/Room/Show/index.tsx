import React, { memo } from "react";

import { useRecoilValue } from "recoil";

import roomAtoms from "recoil/atoms/room";
import useRoom from "hooks/useRoom";

const RoomShow = memo(() => {
  useRoom();
  const room = useRecoilValue(roomAtoms.current);

  return <></>;
});

export default RoomShow;
