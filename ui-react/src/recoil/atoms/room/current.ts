import { atom } from "recoil";
import RoomState from "commonTypes/Game/RoomState";

const roomCurrentState = atom<RoomState | null>({
  key: "roomCurrent",
  default: null,
});

export default roomCurrentState;
