import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Landing from "./pages/Landing";
import RoomShow from "./pages/Rooms/Show";
import RoomsList from "./pages/Rooms/List";

import { Store } from "./redux/store/types";
import userActions from "./redux/actions/user";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store: Store) => store.user);

  useEffect(() => {
    dispatch(userActions.get());
  }, []);

  const game = useSelector((store: Store) => store.game);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          {user && (
            <>
              <Route exact path="/rooms/show" component={RoomShow} />
            </>
          )}
          <Route exact path="/rooms" component={RoomsList} />

          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
