import { atom } from "recoil";
import { Room } from "commonTypes";

const roomListState = atom<Room[]>({
  key: "roomList",
  default: [],
});

export default roomListState;
