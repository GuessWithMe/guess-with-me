import { Express } from 'express-serve-static-core';
import { Strategy as SpotifyStrategy } from 'passport-spotify';
import passport from 'passport';
import moment from 'moment';

import { UserModel } from 'models';
import Environment from 'config/environment';
import { SpotifyProfile } from 'types/SpotifyProfile';

const strategy = new SpotifyStrategy(
  {
    callbackURL: `${Environment.apiUrl}/auth/spotify/callback`,
    clientID: Environment.spotifyClientId,
    clientSecret: Environment.spotifyClientSecret,
  },
  async (
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
    profile: SpotifyProfile,
    done: (err: Error, user: UserModel) => void
  ) => {
    const userData = {
      spotifyAccessToken: accessToken,
      spotifyDisplayName: profile.displayName,
      spotifyId: profile.id,
      spotifyImageUrl: profile.photos[0] || undefined,
      spotifyRefreshToken: refreshToken,
      spotifyUsername: profile.username,
      tokenExpiresAt: moment().add(expiresIn, 'seconds').toDate(),
    };

    let user = await UserModel.findOne({
      where: {
        spotifyId: profile.id,
      },
    });

    user = user ? await user.update(userData) : await UserModel.create(userData);
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
