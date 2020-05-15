import React, { memo, FC } from "react";
import { useRecoilValue } from "recoil";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@material-ui/core";

import history from "lib/history";

import useTitle from "hooks/useTitle";
import useRoomList from "hooks/useRoomList";

import roomsListState from "recoil/atoms/room/list";

import useStyles from "./styles";

const RoomsList: FC<{}> = memo(() => {
  useTitle("Rooms");
  useRoomList();
  const classes = useStyles();
  const rooms = useRecoilValue(roomsListState);

  return (
    <Container>
      {(rooms as any).map((room: any) => {
        return (
          <Card key={room.slug} className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  {room.title}
                </Typography>
              </CardContent>
            </div>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => history.push(`/rooms/${room.slug}`)}
              >
                Play
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </Container>
  );
});

export default RoomsList;
