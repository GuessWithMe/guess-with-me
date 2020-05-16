import { EnvironmentType } from 'types/Environment';

function getConfig(): EnvironmentType {
  return {
    env: 'test',

    spotifyClientId: '2d9daf051c0a468b97b78bd0459e327d',
    spotifyClientSecret: '6b83e31e949d4022ae9f16d560f8de70',

    uiUrl: 'localhost:4200',
    apiUrl: 'localhost:3000',

    postgres: {
      database: 'change',
      host: 'change',
      password: 'change',
      port: 13306,
      username: 'change'
    },

    redis: {
      host: 'change',
      port: 16379
    },

    sessionSecret: 'asdf'
  };
}

export default getConfig();
