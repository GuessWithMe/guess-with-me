import { combineReducers } from "redux";

import app from "./app";
import game from "./game";
import user from "./user";
import rooms from "./rooms";

export default combineReducers({
  app,
  game,
  rooms,
  user,
});
