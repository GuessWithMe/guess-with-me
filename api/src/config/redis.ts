import Environment from 'config/environment';

import { promisify } from 'util';
import redis, { RedisClient } from 'redis';
import rejson from 'redis-rejson';

rejson(redis);

class Redis {
  public client!: RedisClient;

  public open = async () => {
    if (!this.client) {
      this.client = redis.createClient({ host: Environment.redis.host, port: Environment.redis.port });

      this.client.on('error', error => {
        console.log('Redis error');
        console.log(error);
      });
    }

    return this.client;
  };

  public close = () => {
    return new Promise(resolve => {
      this.client.quit(() => {
        delete this.client;
        resolve();
      });
    });
  };

  // tslint:disable-next-line: no-any
  public set = async (...args: any[]) => {
    const object = args.pop();
    // @ts-ignore
    const setPromisified = promisify(this.client.json_set).bind(this.client);
    return setPromisified(...args, JSON.stringify(object));
  };

  public get = async (...args: any[]) => {
    // @ts-ignore
    const getPromisified = promisify(this.client.json_get).bind(this.client);
    return getPromisified(...args);
  };
}
export default new Redis();
