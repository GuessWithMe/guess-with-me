import { EnvironmentType } from 'types/Environment';

function getConfig(): EnvironmentType {
  return {
    env: 'development',

    spotifyClientId: '2d9daf051c0a468b97b78bd0459e327d',
    spotifyClientSecret: '6b83e31e949d4022ae9f16d560f8de70',

    uiUrl: 'http://localhost:4200',
    apiUrl: 'http://localhost:3000',

    postgres: {
      database: 'guess-dev',
      host: 'localhost',
      password: 'postgres',
      port: 5432,
      username: 'postgres'
    },

    redis: {
      host: 'localhost',
      port: 16379
    },

    sessionSecret: 'keyboard cat'
  };
}

export default getConfig();
