import { atom } from "recoil";

const roomCurrentState = atom({
  key: "roomCurrent",
  default: null,
});

export default roomCurrentState;
