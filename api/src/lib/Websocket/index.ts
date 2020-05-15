export default {};
// import WebSocket from 'ws';
// import { Express } from 'express-serve-static-core';

// class WebsocketClient {
//   public ws: WebSocket.Server;

//   public open = (express: any) => {
//     if (!this.ws) {
//       this.ws = new WebSocket.Server({ server: express });

//       this.ws.on('connection', function connection(ws) {
//         console.log('onConnection');

//         // ws.on('message', function incoming(message) {
//         //   console.log('received: %s', message);
//         // });

//         ws.send('something');
//       });
//     }

//     return this.ws;
//   };
// }

// export default new WebsocketClient();
