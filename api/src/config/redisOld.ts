import Environment from 'config/environment';

import { promisify } from 'util';
import redis, { RedisClient } from 'redis';

class RedisConfig {
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

  public getAsync = async (key: string) => {
    const get = promisify(this.client.get).bind(this.client);
    return get(key);
  };

  // tslint:disable-next-line: no-any
  public set = async (...args: any[]) => {
    const setPromisified = promisify(this.client.set).bind(this.client);
    return setPromisified(...args);
  };

  // tslint:disable-next-line: no-any
  public setExAsync = async (...args: any[]) => {
    const set = promisify(this.client.setex).bind(this.client);
    return set(...args);
  };

  // tslint:disable-next-line: no-any
  public del = async (...args: any[]) => {
    const del = promisify(this.client.del).bind(this.client);
    return del(...args);
  };

  // tslint:disable-next-line: no-any
  public hget = async (...args: any[]) => {
    const hgenPromisified = promisify(this.client.hget).bind(this.client);
    return hgenPromisified(...args);
  };

  // tslint:disable-next-line: no-any
  public hset = async (...args: any[]) => {
    const hsetPromisified = promisify(this.client.hset).bind(this.client);
    return hsetPromisified(...args);
  };

  // tslint:disable-next-line: no-any
  public hmset = async (...args: any[]) => {
    const hmsetPromisified = promisify(this.client.hmset).bind(this.client);
    return hmsetPromisified(...args);
  };

  // tslint:disable-next-line: no-any
  public hgetall = async (...args: any[]) => {
    const hgetallPromisified = promisify(this.client.hgetall).bind(this.client);
    return hgetallPromisified(...args);
  };
}
export default new RedisConfig();
