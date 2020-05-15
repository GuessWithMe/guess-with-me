import config from "config";

class SocketService {
  public ws!: WebSocket;

  getClient = () => {
    if (!this.ws) {
      this.ws = new WebSocket(config.wsUrl);
    }

    return this.ws;
  };
}

export default new SocketService();
