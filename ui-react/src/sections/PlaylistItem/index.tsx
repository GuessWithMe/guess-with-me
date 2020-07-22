import React from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import { SpotifyPlaylist } from "commonTypes";

import useStyles from "./styles";

interface Props {
  playlist: SpotifyPlaylist;
  onImport: (id: string) => void;
}

const PlaylistItem = ({ playlist, onImport }: Props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        title={playlist.name}
        subheader={playlist.owner.display_name}
      />
      <CardMedia
        className={classes.media}
        image={playlist.images[0].url}
        title="Paella dish"
      />
      {playlist.description && (
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {playlist.description}
          </Typography>
        </CardContent>
      )}

      <CardActions>
        <Button
          onClick={() => onImport(playlist.id)}
          size="small"
          color="primary"
        >
          Import
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlaylistItem;
