import connectRedis from 'connect-redis';
import redis from 'redis';
import cookie from 'cookie';
import cookieParser from 'cookie-parser';
import express from 'express';
import expressSession from 'express-session';
import http from 'http';

import { User } from '@types';

import environment from './environment';

class SessionConfig {
  public session: express.RequestHandler;
  public store: connectRedis.RedisStore;

  constructor() {
    const { host, port } = environment.redis;

    const redisStore = connectRedis(expressSession);
    const redisClient = redis.createClient({ host, port });
    this.store = new redisStore({ client: redisClient as any });
    this.session = expressSession({
      cookie: { secure: false },
      resave: false,
      saveUninitialized: true,
      secret: environment.sessionSecret,
      store: this.store,
    });
  }

  public get = (req: http.IncomingMessage): Promise<User> => {
    return new Promise((resolve, reject) => {
      const cookies = cookie.parse(req.headers.cookie);
      const sid = cookieParser.signedCookie(cookies['connect.sid'], environment.sessionSecret);

      if (!sid) {
        return reject();
      }

      this.store.get(sid, (err, session) => {
        if (err) {
          return reject(err);
        }
        return resolve((session.passport.user as unknown) as User);
      });
    });
  };
}

export default new SessionConfig();
