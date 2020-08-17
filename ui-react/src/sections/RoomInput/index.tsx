import React, { useCallback } from "react";
import { TextField } from "@material-ui/core";
import { useRecoilState } from "recoil";

import roomAtoms from "recoil/atoms/room";

import useStyles from "./styles";
import { Props } from "./types";

const RoomInput = ({ onSubmit }: Props) => {
  const styles = useStyles();
  const [input, setInput] = useRecoilState(roomAtoms.showInput);

  const onInputChange = useCallback(
    (ev) => {
      setInput(ev.target.value);
    },
    [setInput]
  );

  return (
    <form noValidate onSubmit={onSubmit} autoComplete="off">
      <TextField
        value={input}
        placeholder={"Type here"}
        onChange={onInputChange}
        className={styles.input}
      />
    </form>
  );
};

export default RoomInput;
