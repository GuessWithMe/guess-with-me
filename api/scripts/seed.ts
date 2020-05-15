import 'tsconfig-paths/register';

import sequelize from '../src/config/sequelize';
import Rooms from './Rooms';

const seed = async () => {
  await sequelize.open();

  await Rooms();

  await sequelize.close();
};

seed();
