import { UserState } from "redux/store/types";
import UserActionTypes from "redux/actions/user/types";

const initialState = null;

const user = (state: UserState = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case "USER_GET_SUCCESS": {
      return action.payload;
    }
    case "USER_SIGN_OUT_SUCCESS": {
      return null;
    }
    default: {
      return state;
    }
  }
};

export default user;
