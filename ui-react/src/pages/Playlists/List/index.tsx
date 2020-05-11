import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import appActions from "redux/actions/app";

const PlaylistsList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(appActions.setTitle("Playlists"));
  }, []);

  return <>Playlists lists</>;
};

export default PlaylistsList;
