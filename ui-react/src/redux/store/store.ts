import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducer from "../reducers";

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
