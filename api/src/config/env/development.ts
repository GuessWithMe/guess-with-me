import { EnvironmentType } from '@t/Environment';

function getConfig(): EnvironmentType {
  return {
    env: 'development',

    spotifyClientId: '2d9daf051c0a468b97b78bd0459e327d',
    spotifyClientSecret: '6b83e31e949d4022ae9f16d560f8de70',

    angularUrl: 'http://localhost:4200',
    apiUrl: 'http://localhost:3000',

    maria: {
      db: 'guess-dev',
      host: 'localhost',
      pass: 'option123',
      port: 13306,
      user: 'root'
    },

    redis: {
      host: 'localhost',
      port: 16379
    }
  };
}

export default getConfig();
