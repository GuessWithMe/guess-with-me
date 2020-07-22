import config from "config";
import { useEffect, useState } from "react";

interface Action {
  type: string;
  payload: Record<string, any>;
}

class Socket {
  private ws: WebSocket;

  constructor() {
    this.ws = new WebSocket(`${config.wsUrl}`);
  }

  public send(action: Action) {
    this.ws.send(JSON.stringify(action));
  }
}

const useSocket = () => {
  const [ws, setWs] = useState<Socket>();

  useEffect(() => {
    setWs(new Socket());
  }, []);

  return ws;
};

export default useSocket;
