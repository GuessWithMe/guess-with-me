import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { Store } from "../../store/types";
import config from "../../../config";

const get = (): ThunkAction<void, Store, unknown, Action<string>> => async (
  dispatch
) => {
  const response = await fetch(`${config.apiUrl}/users/current`, {
    credentials: "include",
  });
  const body = await response.json();

  dispatch({
    type: "USER_GET_SUCCESS",
    payload: body,
  });
};

export default get;
