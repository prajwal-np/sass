import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDevice } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { PusherChannel, PusherEvent } from 'nestjs-pusher';
import { PaginationService } from 'src/service/pagination.service';
import { PaginationDto } from 'src/dto/pagination.dto';

@ApiTags('Device')
@Controller()
export class DeviceController {
  constructor(
    private readonly deviceService: DeviceService,
    private paginationService: PaginationService,
  ) {}

  @Post('')
  createDevice(@Body() payload: CreateDevice) {
    return this.deviceService.createDevice(payload, 1);
  }

  // @Get(':status')
  // getDeviceByStatus(@Param() status: string) {
  //   return this.deviceService.getDevicesByStatus(status);
  // }

  @Get('')
  getDevices(@Query() paginationDto: PaginationDto) {
    return this.deviceService.getDevices(paginationDto);
  }

  @Get('/pairing')
  getPairingCode() {
    return this.deviceService.generatePairingCode();
  }

  @PusherChannel('cosmic-lab')
  @PusherEvent('registered')
  @Get('/verify/:paringCode')
  verifyCode(@Param() params: CreateDevice) {
    return this.deviceService.verifyCode(params.paringCode);
  }
}
