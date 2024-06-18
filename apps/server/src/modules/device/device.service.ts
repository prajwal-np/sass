import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDevice } from './dto';
import { Device } from 'src/entity/Device.entity';
import { User } from '../../entity/user.entity';
import { REQUEST } from '@nestjs/core';
import { ConnectionService } from '../connection/connection.service';

@Injectable()
export class DeviceService {
  private deviceRepo: Repository<Device>;
  private userRepo: Repository<User>;
  constructor(
    @Inject(REQUEST) private readonly request,
    private readonly connectionService: ConnectionService,
  ) {
    const tenantId = this.request.tenantId;
    const dataSource = this.connectionService.getDataSource(tenantId);
    dataSource.then((data) => {
      this.deviceRepo = data.getRepository(Device);
      this.userRepo = data.getRepository(User);
    });
  }

  async createDevice(payload: CreateDevice, userId: number): Promise<boolean> {
    const user = await this.userRepo.findOneBy({
      id: userId,
    });
    await this.deviceRepo.save({
      ...payload,
      user,
    });
    return true;
  }

  async getDevice(payload: Partial<Device>): Promise<Device> {
    return this.deviceRepo.findOneBy({
      id: payload.id,
    });
  }

  async getDevices(): Promise<Device[]> {
    return this.deviceRepo.find();
  }

  async getDevicesByStatus(status: string): Promise<Device[]> {
    return this.deviceRepo.findBy({
      status: status,
    });
  }
}
