import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";

import history from "lib/history";

import Landing from "pages/Landing";
import RoomShow from "pages/Room/Show";
import RoomsList from "pages/Room/List";
import PlaylistsList from "pages/Playlists/List";

import RoutePrivate from "components/RoutePrivate";

import Header from "sections/Header";

import userAtoms from "recoil/atoms/user";

import useMe from "hooks/useMe";

import "./App.css";

function App() {
  useMe();
  const me = useRecoilValue(userAtoms.me);

  if (!me) {
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
          <RoutePrivate exact path="/rooms/:slug" component={RoomShow} />
          <Route exact path="/rooms" component={RoomsList} />
          <Route exact path="/playlists" component={PlaylistsList} />
        </>
      </Switch>
    </Router>
  );
}

export default App;
