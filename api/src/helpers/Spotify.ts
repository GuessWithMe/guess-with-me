import moment from 'moment';
import SpotifyWebApi from 'spotify-web-api-node';

import environment from 'config/environment';
import { User } from 'models';

interface RefreshAccessTokenResponse {
  body: {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
  };
}

class SpotifyHelper {
  public static async initializeSpotify(user: User) {
    // Checking if token needs to be refreshed
    let spotifyApi = new SpotifyWebApi({
      accessToken: user.spotifyAccessToken,
      clientId: environment.spotifyClientId,
      clientSecret: environment.spotifyClientSecret,
      refreshToken: user.spotifyRefreshToken
    });

    if (moment(user.tokenExpiresAt).diff(moment()) < 0) {
      spotifyApi = await SpotifyHelper.refreshAccessToken(user, spotifyApi);
    }

    return spotifyApi;
  }

  private static async refreshAccessToken(user: User, spotifyApi: SpotifyWebApi) {
    const res: RefreshAccessTokenResponse = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(res.body.access_token);

    return spotifyApi;
  }
}

export default SpotifyHelper;
