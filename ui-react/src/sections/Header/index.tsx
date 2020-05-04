import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import { ExitToApp } from "@material-ui/icons";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const Header = () => {
  const classes = useStyles();

  const [drawer, toggleDrawer] = React.useState(false);

  const list = () => (
    <div
      className={clsx(classes.list, {
        // [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <List>
        <span>Username</span>
      </List>
      <Divider />
      <List>
        {["Rooms", "Playlists"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button key={"Sign out"}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary={"Sign out"} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <Button onClick={() => toggleDrawer(true)}>Open</Button>
      <Drawer anchor={"left"} open={drawer} onClose={() => toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  );
};

export default Header;
