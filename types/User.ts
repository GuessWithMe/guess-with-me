export interface User {
  id: string;
  spotifyUsername: string;
  spotifyId: string;
  spotifyAccessToken: string;
  spotifyRefreshToken: string;
  spotifyDisplayName: string;
  spotifyImageUrl: string;
  tokenExpiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
