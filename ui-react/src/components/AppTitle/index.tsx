import React from "react";
import { Typography } from "@material-ui/core";
import { useRecoilValue } from "recoil";

import appTitleAtom from "recoil/atoms/app/title";

import useStyles from "./styles";

const AppTitle = () => {
  const styles = useStyles();

  const title = useRecoilValue(appTitleAtom);

  return (
    <Typography variant="h6" className={styles.title}>
      {title}
    </Typography>
  );
};

export default AppTitle;
