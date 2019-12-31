import { Express } from 'express-serve-static-core';
import { Strategy as SpotifyStrategy } from 'passport-spotify';
import passport from 'passport';
import moment from 'moment';

import { SpotifyProfile } from '@t/SpotifyProfile';
import { User } from '@models';
import Environment from '@env';

const strategy = new SpotifyStrategy(
  {
    callbackURL: `${Environment.apiUrl}/auth/spotify/callback`,
    clientID: Environment.spotifyClientId,
    clientSecret: Environment.spotifyClientSecret
  },
  async (
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
    profile: SpotifyProfile,
    done: (err: Error, user: User) => void
  ) => {
    const userData = {
      spotifyAccessToken: accessToken,
      spotifyDisplayName: profile.displayName,
      spotifyId: profile.id,
      spotifyImageUrl: profile.photos[0] || undefined,
      spotifyRefreshToken: refreshToken,
      spotifyUsername: profile.username,
      tokenExpiresAt: moment()
        .add(expiresIn, 'seconds')
        .toDate()
    };

    let user = await User.findOne({
      where: {
        spotifyId: profile.id
      }
    });

    user = user ? await user.update(userData) : await User.create(userData);
    return done(undefined, user);
  }
);

export default function setupPassport(app: Express) {
  passport.serializeUser((user, done) => {
    done(undefined, user);
  });

  passport.deserializeUser((user, done) => {
    done(undefined, user);
  });

  passport.use(strategy);
  app.use(passport.initialize());
  app.use(passport.session());
}
