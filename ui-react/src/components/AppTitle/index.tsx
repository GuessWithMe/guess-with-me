import React from "react";

import { Typography } from "@material-ui/core";

import useStyles from "./styles";
import { State } from "redux/store/types";
import { useSelector } from "react-redux";

const AppTitle = () => {
  const styles = useStyles();
  const title = useSelector((state: State) => state.app.title);

  return (
    <Typography variant="h6" className={styles.title}>
      {title}
    </Typography>
  );
};

export default AppTitle;
