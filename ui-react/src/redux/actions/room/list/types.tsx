import { Room } from "../../../../../../types";

export interface RoomsListSuccessAction {
  type: "ROOMS_LIST_SUCCESS";
  payload: Room[];
}

export type RoomsListActionTypes = RoomsListSuccessAction;
