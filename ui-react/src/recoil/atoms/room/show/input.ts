import { atom } from "recoil";

const roomShowInputState = atom<string>({
  key: "roomShowInput",
  default: "",
});

export default roomShowInputState;
