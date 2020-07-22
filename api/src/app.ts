import { createTerminus, TerminusOptions } from '@godaddy/terminus';
import { Express } from 'express-serve-static-core';
import bodyParser from 'body-parser';
import cookie from 'cookie';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import WebSocket from 'ws';

import environment from 'config/environment';
import sequelize from 'config/sequelize';
import setupPassport from 'config/passport';
import SessionConfig from 'config/session';

// Routes
import AdminRoutes from 'routes/Admin';
import AuthRoutes from 'routes/Auth';
import GameRoutes from 'routes/Game';
import PlaylistRoutes from 'routes/Playlist';
import RoomRoutes from 'routes/Room';
import UserRoutes from 'routes/User';

import wsClient from 'lib/Websocket';

import redis from 'config/redis';

// import playlistsEvents from 'sockets/playlists';
// import roomsEvents from './sockets/rooms';
import { startWorker } from './worker';
// import state from 'state';

class App {
  public app: Express;
  public server: http.Server;
  private session: express.RequestHandler;
  private socket!: SocketIO.Server;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);

    sequelize.open();
    this.configureCors();

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookieParser());

    this.app.use(SessionConfig.session);

    // this.socket = this.configureWebSockets();
    setupPassport(this.app);
    this.configureMorgan();
    this.mountRoutes();
    this.configureTerminus();

    startWorker();

    redis.open();

    wsClient.open(this.server);

    console.log('----------------- Server started -----------------');

    this.init();
  }

  private mountRoutes(): void {
    const router = express.Router();
    this.app.use('/test', (req, res, next) => {
      res.json({ test: 3 });
    });
    this.app.use('/auth', AuthRoutes);
    this.app.use('/game', GameRoutes);
    this.app.use('/playlists', PlaylistRoutes);
    this.app.use('/users', UserRoutes);
    this.app.use('/admin', AdminRoutes);
    this.app.use('/rooms', RoomRoutes);
    this.app.use('/', router);
  }

  private configureCors() {
    const corsOptions = {
      credentials: true,
      origin: [environment.uiUrl, 'https://accounts.spotify.com'],
    };

    this.app.use(cors(corsOptions));
  }

  private configureMorgan() {
    this.app.use(morgan('tiny'));
  }

  // private configureWebSockets() {
  //   const server = SocketWrapper.init(this.server, this.session);
  //   SocketWrapper.namespaces.rooms.on('connection', roomsEvents);
  //   SocketWrapper.namespaces.playlists.on('connection', playlistsEvents);
  //   return server;
  // }

  private async startSongDistributer() {
    // SongDistributer.start();
  }

  private configureTerminus() {
    const options: TerminusOptions = {
      timeout: 1000,
      signals: ['SIGINT', 'SIGTERM'],
      beforeShutdown: async () => {
        // await ActivePlayerHelper.setActivePlayers({});
      },
      onSignal: async () => {
        // Websockets.close();
        process.exit();
      },
    };

    createTerminus(this.server, options);
  }

  private closeSocket = () => {
    return new Promise((resolve) => {
      this.socket.close(() => resolve());
    });
  };

  private init = async () => {
    // await GameService.initRoomStatuses();
    this.startSongDistributer();
  };
}

export default new App();
