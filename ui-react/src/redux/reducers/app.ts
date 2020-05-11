import { AppState } from "redux/store/types";

const initialState = {
  title: "",
};

const user = (state: AppState = initialState, action: any) => {
  switch (action.type) {
    case "APP_TITLE_SET": {
      return {
        ...state,
        title: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default user;
