import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';

@Module({
  imports: [],
  providers: [DeviceService],
  controllers: [DeviceController],
})
export class DeviceModule {}
