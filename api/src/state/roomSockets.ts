import WebSocket from 'ws';

import { RoomModel } from 'models';

type RoomSockets = Record<RoomModel['slug'], WebSocket[]>;

class RoomSocketsState {
  public state: RoomSockets = {};

  // Adding socket to room
  public onSocketJoin = (slug: RoomModel['slug'], ws: WebSocket) => {
    if (!this.state[slug]) {
      this.state[slug] = [];
    }

    this.state[slug].push(ws);

    return this.state[slug];
  };
}

export default new RoomSocketsState();
