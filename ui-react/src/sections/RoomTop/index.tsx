import React from "react";
import { Box, Typography } from "@material-ui/core";
import { Close, Check } from "@material-ui/icons";
import clsx from "clsx";

import Timer from "components/Timer";

import useStyles from "./styles";
import { Props } from "./types";

const RoomTop = ({ flash, timeLeft }: Props) => {
  const styles = useStyles();
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Close
        className={clsx(styles.guessMarker, flash.red && "flash", "red")}
      />
      <Typography variant="h1" className={styles.timer}>
        <Timer timeLeft={timeLeft} />
      </Typography>
      <Check
        className={clsx(styles.guessMarker, flash.green && "flash", "green")}
      />
    </Box>
  );
};

export default RoomTop;
