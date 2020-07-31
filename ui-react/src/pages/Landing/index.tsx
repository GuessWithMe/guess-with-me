import React from "react";
import config from "../../config";

import useStyles from "./styles";
import spotifyIcon from "./../../assets/spotify-icon.svg";

const Landing = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <a className={styles.link} href={`${config.apiUrl}/auth/spotify`}>
        <img src={spotifyIcon} alt="Spotify Icon" />
        <span>Sign in with Spotify</span>
      </a>
    </div>
  );
};

export default Landing;
