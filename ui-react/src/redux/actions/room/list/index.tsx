import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { State } from "redux/store/types";

import http from "lib/api";

import config from "config";

import { Room } from "../../../../../../types";

const list = (): ThunkAction<void, State, unknown, Action<string>> => async (
  dispatch
) => {
  const res = await http<{ rooms: Room[] }>(`${config.apiUrl}/rooms`);

  if (res) {
    dispatch({
      type: "ROOMS_LIST_SUCCESS",
      payload: res.rooms,
    });
  }

  return res;
};

export default list;
