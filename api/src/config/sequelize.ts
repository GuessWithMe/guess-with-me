import { Sequelize } from 'sequelize-typescript';

import Environment from 'config/environment';

import * as models from 'models';

class SequelizeConfig {
  public client!: Sequelize;

  public open = async () => {
    if (!this.client) {
      const { database, host, password, port, username } = Environment.postgres;

      this.client = new Sequelize({
        database,
        dialect: 'postgres',
        host,
        password,
        port,
        username,
        logging: false
      });

      this.client.addModels(Object.values(models));

      // await this.client.sync({ force: true });
    }

    return this.client;
  };

  public close = async () => {
    await this.client.close();
    delete this.client;
  };
}

export default new SequelizeConfig();
