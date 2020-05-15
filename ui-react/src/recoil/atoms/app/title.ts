import { atom } from "recoil";

const appTitleState = atom({
  key: "appTitle",
  default: "",
});

export default appTitleState;
