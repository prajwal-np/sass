import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateDevice } from './dto';
import { User } from '../../entity/user.entity';
import { REQUEST } from '@nestjs/core';
import { ConnectionService } from '../connection/connection.service';
import { DeviceUtil } from './utils';
import { Devices } from 'src/entity/devices.entity';
import { PusherService } from 'src/service/pusher/pusher.service';
import { PaginationDto } from 'src/dto/pagination.dto';
import { PaginationService } from 'src/service/pagination.service';
@Injectable()
export class DeviceService {
  private deviceRepo: Repository<Devices>;
  private tenantId: string;
  constructor(
    @Inject(REQUEST) private readonly request,
    private readonly connectionService: ConnectionService,
    private deviceUtil: DeviceUtil,
    private pusherService: PusherService,
    private paginatioService: PaginationService,
  ) {
    this.tenantId = this.request.tenantId;
    // dataSource.then((data) => {
    //   this.deviceRepo = data.getRepository(Device);
    //   this.userRepo = data.getRepository(User);
    // });
  }

  async createDevice(payload: CreateDevice, userId: number): Promise<boolean> {
    // const user = await this.userRepo.findOneBy({
    //   id: userId,
    // });
    // await this.deviceRepo.save({
    //   ...payload,
    // });
    return true;
  }

  async getDevice(payload: Partial<Devices>): Promise<Devices> {
    return this.deviceRepo.findOneBy({
      id: payload.id,
    });
  }

  async getDevices(paginationDto: PaginationDto): Promise<any> {
    const dataSource = await this.connectionService.getDataSource(
      this.tenantId,
    );
    const repo = dataSource.createQueryBuilder(Devices, 'devices');
    const paginateData = await this.paginatioService.paginate(
      repo,
      paginationDto,
    );
    return paginateData;
  }

  async getDevicesByStatus(status: string): Promise<Devices[]> {
    return this.deviceRepo.findBy({
      status: status,
    });
  }

  async generatePairingCode() {
    const res = this.deviceUtil.encrypt();
    return res;
  }

  async verifyCode(code: number) {
    const dataSource = await this.connectionService.getDataSource(
      this.tenantId,
    );
    const repo = dataSource.getRepository(Devices);

    const paired = this.deviceUtil.decrypt(code);
    // const user = await this.userRepo.findOneBy({
    //   id: 1,
    // });
    if (paired) {
      const res = await repo.save({
        code: String(code),
        status: 'active',
      });
      console.log(res);
      this.pusherService.trigger('cosmic-lab', 'registered', res);
      return res;
    }
  }
}
