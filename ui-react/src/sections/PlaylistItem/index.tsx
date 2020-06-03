import React, { useCallback } from "react";
import clsx from "clsx";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import Typography from "@material-ui/core/Typography";

import { SpotifyPlaylist } from "commonTypes";

import useStyles from "./styles";
import { Button } from "@material-ui/core";
import services from "services";

interface Props {
  playlist: SpotifyPlaylist;
}

const PlaylistItem = ({ playlist }: Props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const importPlaylist = useCallback(() => {
    // services.playlist.import();
  }, []);

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
        <Button onClick={importPlaylist} size="small" color="primary">
          Import
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlaylistItem;
