import { join } from 'path';
import { DataSourceOptions } from 'typeorm';
import * as ormConfig from './ormconfig';

module.exports = {
  ...ormConfig,
  type: 'postgres',
  entities: [join(__dirname, './src/**/*.entity{.ts,.js}')],
} as DataSourceOptions;
