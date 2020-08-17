import { atom } from "recoil";
import { User } from "commonTypes/User";

const meState = atom<User | null>({
  key: "me",
  default: null,
});

export default meState;
