import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import roomAtoms from "recoil/atoms/room";
import services from "services";

const useRoomList = () => {
  const setRooms = useSetRecoilState(roomAtoms.list);

  useEffect(() => {
    const get = async () => {
      const rooms = await services.room.list();
      setRooms(rooms);
    };
    get();
  }, []);
};

export default useRoomList;
