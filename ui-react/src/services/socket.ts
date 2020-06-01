import config from "config";

class SocketService {
  public ws!: WebSocket;

  open = () => {
    if (!this.ws) {
      this.ws = new WebSocket(config.wsUrl);
    }
    return this.ws;
  };

  get = () => {
    return this.ws;
  };
}

export default new SocketService();
