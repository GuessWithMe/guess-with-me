import React, { useEffect, memo, FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { State } from "redux/store/types";
import appActions from "redux/actions/app";
import roomActions from "redux/actions/room";

const RoomsList: FC<{}> = memo(() => {
  const dispatch = useDispatch();
  const rooms = useSelector((state: State) => state.rooms.list);

  useEffect(() => {
    dispatch(appActions.setTitle("Rooms"));
    dispatch(roomActions.list());
  }, []);

  return (
    <>
      {rooms.map((room) => {
        return <>{room.title}</>;
      })}
    </>
  );
});

export default RoomsList;
