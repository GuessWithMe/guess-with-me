import { atom } from "recoil";

const roomListState = atom({
  key: "roomList",
  default: [],
});

export default roomListState;
