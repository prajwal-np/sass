import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDevice } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Device')
@Controller()
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post('')
  createDevice(@Body() payload: CreateDevice) {
    return this.deviceService.createDevice(payload, 1);
  }

  @Get(':status')
  getDeviceByStatus(@Param() status: string) {
    return this.deviceService.getDevicesByStatus(status);
  }

  @Get('')
  getDevices() {
    return this.deviceService.getDevices();
  }
}
