import { join } from 'path';
import { Admin } from 'src/adminEntity/admin.entity';
import { DataSourceOptions } from 'typeorm';

import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

class SnakeNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  tableName(className: string, customName: string): string {
    return customName || snakeCase(className);
  }

  columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[],
  ): string {
    return (
      snakeCase(embeddedPrefixes.join('_')) +
      (customName || snakeCase(propertyName))
    );
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }

  joinColumnName(relationName: string, referencedColumnName: string): string {
    return snakeCase(`${relationName}_${referencedColumnName}`);
  }

  joinTableName(
    firstTableName: string,
    secondTableName: string,
    firstPropertyName: string,
  ): string {
    return snakeCase(
      `${firstTableName}_${firstPropertyName.replace(
        /\./gi,
        '_',
      )}_${secondTableName}`,
    );
  }

  joinTableColumnName(
    tableName: string,
    propertyName: string,
    columnName?: string,
  ): string {
    return snakeCase(`${tableName}_${columnName || propertyName}`);
  }

  classTableInheritanceParentColumnName(
    parentTableName: string,
    parentTableIdPropertyName: string,
  ): string {
    return snakeCase(`${parentTableName}_${parentTableIdPropertyName}`);
  }
}

module.exports = {
  // type: 'mysql',
  // host: 'localhost',
  // port: 3306,
  // username: 'root',
  // password: 'password',
  // database: 'cosmic_lab',
  logging: true,
  autoLoadEntities: true,
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [join(__dirname, './src/adminEntity/*.entity{.ts,.js}')],
  // migrations: [join(__dirname, './migrations/adminEntity/*{.ts,.js}')],
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'password',
  database: 'cosmic_lab',
} as DataSourceOptions;
