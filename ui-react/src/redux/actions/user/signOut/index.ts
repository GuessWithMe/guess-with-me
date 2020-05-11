import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { State } from "redux/store/types";
import config from "config";

const signOut = (): ThunkAction<void, State, unknown, Action<string>> => async (
  dispatch
) => {
  await fetch(`${config.apiUrl}/auth/logout`, {
    credentials: "include",
  });

  dispatch({
    type: "USER_SIGN_OUT_SUCCESS",
  });
};

export default signOut;
