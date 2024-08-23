import { Module, DynamicModule, Global, Scope } from '@nestjs/common';
import { ConnectionService, getTenantConnection } from './connection.service';
import { REQUEST } from '@nestjs/core';
export const CONNECTION = Symbol('CONNECTION');
const connectionFactory = {
  provide: CONNECTION,
  scope: Scope.REQUEST,
  useFactory: (request) => {
    // const { tenantId } = request;
    // if (tenantId) {
    return getTenantConnection('tenant_1');
    // }

    // return null;
  },
  inject: [REQUEST],
};

@Global()
@Module({})
export class ConnectionModule {
  static forRoot(): DynamicModule {
    return {
      module: ConnectionModule,
      providers: [ConnectionService, connectionFactory],
      exports: [ConnectionService, CONNECTION],
    };
  }
}
