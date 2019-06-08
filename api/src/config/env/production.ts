import { EnvironmentType } from "@t/Environment";

function getConfig(): EnvironmentType {
  return {
    env: 'production',

    spotifyClientId: '2d9daf051c0a468b97b78bd0459e327d',
    spotifyClientSecret: '6b83e31e949d4022ae9f16d560f8de70',

    angularUrl: 'http://play.guesswith.me',
    apiUrl: 'http://ec2-3-17-134-101.us-east-2.compute.amazonaws.com',

    maria: {
      user: 'eduards',
      db: 'guesswithme_production',
      port: 3306,
      host: 'guesswithme-production.cibxy7qppg0h.us-east-2.rds.amazonaws.com',
      pass: 'p*L4u^mhebDJYqzkIvkS%wyF46WYh7',
    },

    redis: {
      host: 'guesswith-me.yobdbg.0001.use2.cache.amazonaws.com',
      port: 6379,
    },
  };
}

export default getConfig();
