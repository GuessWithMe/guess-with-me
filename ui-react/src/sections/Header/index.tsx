import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";

import { ExitToApp, ArtTrack, MeetingRoom, Menu } from "@material-ui/icons";

import { State } from "redux/store/types";
import userActions from "redux/actions/user";

import useStyles from "./styles";
import AppTitle from "components/AppTitle";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const styles = useStyles();

  const location = useLocation();

  const [drawer, toggleDrawer] = useState(false);
  const user = useSelector((store: State) => store.user);
  const [title, setTitle] = useState("Playlists");

  useEffect(() => {
    toggleDrawer(false);
  }, [location]);

  const onSignOut = useCallback(() => {
    dispatch(userActions.signOut());
    history.push("/");
  }, [dispatch]);

  const links = useMemo(
    () => [
      {
        uri: "/rooms",
        label: "Rooms",
        icon: <MeetingRoom />,
      },
      {
        uri: "/playlists",
        label: "Playlists",
        icon: <ArtTrack />,
      },
    ],
    []
  );

  if (!user) {
    return null;
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={styles.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => toggleDrawer(true)}
          >
            <Menu />
          </IconButton>
          <AppTitle />
        </Toolbar>
      </AppBar>

      <Drawer anchor={"left"} open={drawer} onClose={() => toggleDrawer(false)}>
        <div className={styles.list}>
          <List component="nav">
            <ListItem>
              <img
                className={styles.avatar}
                src={user.spotifyImageUrl}
                alt="avatar"
              />
              {user.spotifyUsername}
            </ListItem>
            <Divider />
            {links.map(({ uri, label, icon }) => (
              <ListItem button component={Link} to={uri} key={label}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItem>
            ))}
            <Divider />
            <ListItem button onClick={onSignOut} key={"Sign out"}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary={"Sign out"} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default Header;
