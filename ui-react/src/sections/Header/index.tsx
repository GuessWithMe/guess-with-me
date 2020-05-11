import React, { useState, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@material-ui/core";

import {
  ExitToApp,
  PhotoCamera,
  ArtTrack,
  MeetingRoom,
  Menu,
} from "@material-ui/icons";

import { State } from "redux/store/types";
import userActions from "redux/actions/user";

import useStyles from "./styles";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const styles = useStyles();
  const [drawer, toggleDrawer] = useState(false);
  const user = useSelector((store: State) => store.user);

  const links = [
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
  ] as const;

  const onSignOut = useCallback(() => {
    dispatch(userActions.signOut());
    history.push("/");
  }, [dispatch]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <IconButton
        onClick={() => toggleDrawer(true)}
        color="primary"
        aria-label="menu"
        component="span"
      >
        <Menu />
      </IconButton>
      {/* <Button onClick={() => toggleDrawer(true)}>
        <Icon></Icon>>
      </Button> */}
      <Drawer anchor={"left"} open={drawer} onClose={() => toggleDrawer(false)}>
        <div className={styles.list}>
          <List component="nav">
            <ListItem>
              <img src={user.spotifyImageUrl} alt="avatar" />
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
    </div>
  );
};

export default Header;
