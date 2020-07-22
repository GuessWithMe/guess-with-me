import React, { useState, useCallback, useEffect, useMemo } from "react";

import { ExitToApp, ArtTrack, MeetingRoom, Menu } from "@material-ui/icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  AppBar,
  Avatar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@material-ui/core";

import services from "services";

import userAtoms from "recoil/atoms/user";

import AppTitle from "components/AppTitle";

import useStyles from "./styles";

const Header = () => {
  const history = useHistory();
  const styles = useStyles();

  const location = useLocation();

  const [drawer, toggleDrawer] = useState(false);
  const me = useRecoilValue(userAtoms.me);

  useEffect(() => {
    toggleDrawer(false);
  }, [location]);

  const onSignOut = useCallback(async () => {
    await services.user.signOut();
    history.push("/");
  }, []);

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

  if (!me) {
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
              <Avatar
                alt="avatar"
                src={me.spotifyImageUrl}
                className={styles.avatar}
              />

              {me.spotifyUsername}
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
