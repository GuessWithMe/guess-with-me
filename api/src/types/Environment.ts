export interface EnvironmentType {
  env: 'development' | 'production' | 'test';

  spotifyClientId: string;
  spotifyClientSecret: string;

  uiUrl: string;
  apiUrl: string;

  postgres: {
    database: string;
    host: string;
    password: string;
    port: number;
    username: string;
  };

  redis: {
    host: string;
    port: number;
  };

  sessionSecret: string;
}
