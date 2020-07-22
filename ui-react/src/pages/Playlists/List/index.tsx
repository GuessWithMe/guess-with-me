import React, { useEffect, useState, useCallback } from "react";
import { Container } from "@material-ui/core";

import services from "services";
import { SpotifyPlaylist } from "commonTypes";

import PlaylistItem from "sections/PlaylistItem";

import useSocket from "hooks/useSocket";
import useTitle from "hooks/useTitle";

const PlaylistsList = () => {
  useTitle("Playlists");
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const socket = useSocket();

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

  const onImport = useCallback(
    (id: SpotifyPlaylist["id"]) => {
      socket?.send({
        type: "PLAYLIST_IMPORT",
        payload: {
          id,
        },
      });
    },
    [socket]
  );

  return (
    <Container maxWidth="xs">
      {playlists.map((playlist) => (
        <PlaylistItem
          key={playlist.id}
          onImport={onImport}
          playlist={playlist}
        />
      ))}
    </Container>
  );
};

export default PlaylistsList;
