import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { State } from "redux/store/types";
import http from "lib/api";
import config from "config";

import { User } from "../../../../../../types";

const get = (): ThunkAction<void, State, unknown, Action<string>> => async (
  dispatch
) => {
  const res = await http<User>(`${config.apiUrl}/users/current`);

  if (res) {
    dispatch({
      type: "USER_GET_SUCCESS",
      payload: res,
    });
  }

  return res;
};

export default get;
