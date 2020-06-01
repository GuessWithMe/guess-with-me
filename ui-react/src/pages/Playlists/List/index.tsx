import React, { useEffect, useState } from "react";

import services from "services";
import { Playlist, SpotifyPlaylists, PlaylistItem } from "commonTypes";

import useTitle from "hooks/useTitle";
import { Box } from "@material-ui/core";

const PlaylistsList = () => {
  useTitle("Playlists");
  const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);

  useEffect(() => {
    const getPlaylists = async () => {
      const res = await services.playlist.list();
      setPlaylists(res.spotifyPlaylists);
    };

    getPlaylists();
    return () => {
      // cleanup;
    };
  }, []);

  return (
    <>
      {playlists.map(({ name }) => (
        <Box>{name}</Box>
      ))}
    </>
  );
};

export default PlaylistsList;
