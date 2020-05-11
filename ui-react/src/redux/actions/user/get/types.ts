import { User } from "../../../../../../types";

export interface UserGetSuccessAction {
  type: "USER_GET_SUCCESS";
  payload: User;
}

export type UserGetActionTypes = UserGetSuccessAction;
