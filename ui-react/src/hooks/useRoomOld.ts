import { useEffect, useCallback } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import { useParams } from "react-router-dom";

import appAtoms from "recoil/atoms/app";
import roomAtoms from "recoil/atoms/room";

import services from "services";

const useRoom = () => {
  const { slug } = useParams();
  const [room, setRoom] = useRecoilState(roomAtoms.current);
  console.log("useRoom room: ", room);

  const setAppTitle = useSetRecoilState(appAtoms.title);

  const setRoomCallback = useCallback(
    (roomRes) => {
      setRoom({
        ...room,
        ...roomRes,
      });
    },
    [room]
  );

  useEffect(() => {
    const get = async () => {
      const roomRes = await services.room.get(slug);
      setRoomCallback(roomRes);
      setAppTitle(room.title);
    };
    get();

    return () => {
      setRoom(null);
    };
  }, [slug]);
};

export default useRoom;
