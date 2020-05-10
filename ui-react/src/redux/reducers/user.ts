const initialState = {};

const user = (state = initialState, action: any) => {
  switch (action.type) {
    case "USER_GET_SUCCESS": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default user;
