import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { DeviceUtil } from './utils';
import { PusherService } from 'src/service/pusher/pusher.service';
import { PaginationService } from 'src/service/pagination.service';

@Module({
  imports: [],
  providers: [DeviceService, DeviceUtil, PusherService, PaginationService],
  controllers: [DeviceController],
})
export class DeviceModule {}
