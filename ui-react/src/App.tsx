import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Router } from "react-router-dom";

import { State } from "redux/store/types";
import userActions from "redux/actions/user";

import history from "lib/history";

import { Switch, Route } from "react-router-dom";
import Landing from "pages/Landing";
import RoomShow from "pages/Rooms/Show";
import RoomsList from "pages/Rooms/List";
import PlaylistsList from "pages/Playlists/List";

import RoutePrivate from "components/RoutePrivate";

import Header from "sections/Header";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.user);

  useEffect(() => {
    dispatch(userActions.get());
  }, []);

  if (!user) {
    return (
      <Router history={history}>
        <Route exact path="/" component={Landing} />
      </Router>
    );
  }

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Landing} />
        <>
          <Header />
          <RoutePrivate exact path="/rooms/:id" component={RoomShow} />
          <RoutePrivate exact path="/rooms" component={RoomsList} />
          <RoutePrivate exact path="/playlists" component={PlaylistsList} />
        </>
      </Switch>
    </Router>
  );
}

export default App;
