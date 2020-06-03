import React, { useEffect, useState } from "react";

import services from "services";
import { Playlist, SpotifyPlaylists, SpotifyPlaylist } from "commonTypes";

import PlaylistItem from "sections/PlaylistItem";

import useTitle from "hooks/useTitle";
import { Box, Container } from "@material-ui/core";

const PlaylistsList = () => {
  useTitle("Playlists");
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);

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
    <Container maxWidth="xs">
      {playlists.map((playlist) => (
        <PlaylistItem key={playlist.id} playlist={playlist} />
      ))}
    </Container>
  );
};

export default PlaylistsList;
