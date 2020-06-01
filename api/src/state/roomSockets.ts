import WebSocket from 'ws';

import { Room } from 'models';

type RoomSockets = Record<Room['slug'], WebSocket[]>;

class RoomSocketsState {
  public state: RoomSockets = {};

  public onSocketJoin = (slug: Room['slug'], ws: WebSocket) => {
    if (!this.state[slug]) {
      this.state[slug] = [];
    }

    this.state[slug].push(ws);

    return this.state[slug];
  };
}

export default new RoomSocketsState();
