import { RoomsState } from "redux/store/types";
import RoomsActionTypes from "redux/actions/room/types";

const initialState = {
  list: [],
};

const user = (state: RoomsState = initialState, action: RoomsActionTypes) => {
  switch (action.type) {
    case "ROOMS_LIST_SUCCESS": {
      return { ...state, list: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default user;
