import { Module, DynamicModule, Global } from '@nestjs/common';
import { ConnectionService } from './connection.service';

@Global()
@Module({})
export class ConnectionModule {
  static forRoot(): DynamicModule {
    return {
      module: ConnectionModule,
      providers: [ConnectionService],
      exports: [ConnectionService],
    };
  }
}
