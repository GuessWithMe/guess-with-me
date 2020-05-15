import { atom } from "recoil";

const meState = atom({
  key: "me",
  default: null,
});

export default meState;
