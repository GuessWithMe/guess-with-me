import { atom } from "recoil";
import { Player } from "commonTypes/Game/Player";

const players = atom<Player[]>({
  key: "players",
  default: [],
});

export default players;
