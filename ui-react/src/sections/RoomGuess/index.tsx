import React from "react";
import { Box } from "@material-ui/core";

import { Props } from "./types";
import useStyles from "./styles";

const RoomGuess = ({ guess }: Props) => {
  const styles = useStyles();

  return (
    <>
      {/* Artist */}
      <Box display="block">
        {guess.artist.map(({ word, correct }, key) => (
          <Box key={key} className={styles.wordContainer}>
            {!correct &&
              word.split("").map((letter, idx) => <span key={idx}>_</span>)}
            {correct && <span>{word}</span>}
          </Box>
        ))}
      </Box>
      {/* Name */}
      <Box display="block">
        {guess.name.map(({ word, correct }, key) => (
          <Box key={key} className={styles.wordContainer}>
            {!correct &&
              word.split("").map((letter, idx) => <span key={idx}>_</span>)}
            {correct && <span>{word}</span>}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default RoomGuess;
