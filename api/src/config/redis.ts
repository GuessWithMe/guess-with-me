import Environment from '@env';

import { promisify } from 'util';
import redis, { RedisClient } from 'redis';

class RedisConfig {
  private client!: RedisClient;

  public open = async () => {
    if (!this.client) {
      this.client = redis.createClient({ host: Environment.redis.host, port: Environment.redis.port });

      this.client.on('error', error => {
        console.log('Redis error');
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

  public getAsync = async (key: string) => {
    const get = promisify(this.client.get).bind(this.client);
    return get(key);
  };

  public setAsync = async (...args: any[]) => {
    const set = promisify(this.client.set).bind(this.client);
    return set(...args);
  };

  public setExAsync = async (...args: any[]) => {
    const set = promisify(this.client.setex).bind(this.client);
    return set(...args);
  };

  public del = async (...args: any[]) => {
    const del = promisify(this.client.del).bind(this.client);
    return del(...args);
  };
}
export default new RedisConfig();
