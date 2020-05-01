// class WS {
//   public init = () => {
//     const ws = new WebSocket('ws://127.0.0.1:8080');

//     ws.onopen = () => {
//       // connection opened
//       ws.send('something'); // send a message
//     };

//     ws.onmessage = (e) => {
//       // a message was received
//       console.log(e.data);
//     };

//     ws.onerror = (e) => {
//       // an error occurred
//       console.log(e.message);
//     };

//     ws.onclose = (e) => {
//       // connection closed
//       console.log(e.code, e.reason);
//     };

//     return ws;
//   }
// }

// export default new WS().init();
