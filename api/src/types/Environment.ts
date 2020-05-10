export interface EnvironmentType {
  env: 'development' | 'production' | 'test';

  spotifyClientId: string;
  spotifyClientSecret: string;

  uiUrl: string;
  apiUrl: string;

  maria: {
    host: string;
    port: number;
    user: string;
    pass: string;
    db: string;
  };

  redis: {
    host: string;
    port: number;
  };
}
