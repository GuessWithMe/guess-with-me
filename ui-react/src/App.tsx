import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import "./App.css";
import RoomShow from "./pages/Room/Show";
import Landing from "./pages/Landing";

function App() {
  const [user, setUser] = useState(true);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          {user && <Route exact path="/room/show" component={RoomShow} />}
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
