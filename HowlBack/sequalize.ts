// sequelize.ts

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.MARIADB_DATABASE || '', process.env.MARIADB_ROOT_USERNAME || '',
 process.env.MARIADB_ROOT_PASSWORD || '', {
  host: 'process.env.MARIADB_HOST',
  dialect: 'mariadb', // or another dialect like 'mysql'
});

export default sequelize;
