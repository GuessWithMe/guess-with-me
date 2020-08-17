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

import { startWorker } from './worker';

class App {
  public app: Express;
  public server: http.Server;
  private session: express.RequestHandler;

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

  private configureTerminus() {
    const options: TerminusOptions = {
      timeout: 1000,
      signals: ['SIGINT', 'SIGTERM'],
      beforeShutdown: async () => {},
      onSignal: async () => {
        process.exit();
      },
    };

    createTerminus(this.server, options);
  }
}

export default new App();
