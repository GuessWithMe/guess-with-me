import React, { FC, memo, useMemo } from "react";
import { useRecoilValue } from "recoil";

import { Close, Check } from "@material-ui/icons";
import { Box } from "@material-ui/core";

import RoomState from "commonTypes/Game/RoomState";
import roomAtoms from "recoil/atoms/room";

import useStyles from "./styles";

const RoomPlayers: FC<{}> = memo(() => {
  const styles = useStyles();
  const room: RoomState = useRecoilValue(roomAtoms.current);

  const players = useMemo(() => {
    return room.players.map(
      ({ avatar, username, artistCorrect, titleCorrect }) => (
        <Box className={styles.player}>
          <img className={styles.avatar} src={avatar}></img>
          <span className={styles.username}>{username}</span>
          <Box className={styles.gridItemWrapper}>
            {artistCorrect ? <Check /> : <Close />}
          </Box>
          <Box className={styles.gridItemWrapper}>
            {titleCorrect ? <Check /> : <Close />}
          </Box>
          <Box className={styles.gridItemWrapper}>15</Box>
        </Box>
      )
    );
  }, [room.players]);

  return (
    <Box className={styles.wrapper}>
      <>
        <Box className={styles.header}>
          <span></span>
          <span></span>
          <span>Artist</span>
          <span>Title</span>
          <span>Points</span>
        </Box>
        {players}
      </>
    </Box>
  );
});

export default RoomPlayers;
