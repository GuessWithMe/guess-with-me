import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useParams } from "react-router-dom";

import appAtoms from "recoil/atoms/app";
import roomAtoms from "recoil/atoms/room";

import services from "services";

const useRoom = () => {
  const { slug } = useParams();
  const setRoom = useSetRecoilState(roomAtoms.current);
  const setAppTitle = useSetRecoilState(appAtoms.title);

  useEffect(() => {
    const get = async () => {
      const room = await services.room.get(slug);
      setRoom(room);
      setAppTitle(room.title);
    };
    get();
  }, [slug]);
};

export default useRoom;
