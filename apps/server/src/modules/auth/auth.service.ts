import {
  Inject,
  Injectable,
  NotFoundException,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUser } from 'src/dto/user/user.dto';
import { User } from '../../entity/user.entity';
import * as bcrypt from 'bcrypt';
import {
  ConnectionService,
  getTenantConnection,
} from '../connection/connection.service';
import { Admin } from 'src/adminEntity/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, DataSource, Repository } from 'typeorm';
import { CONNECTION } from '../connection/connection.module';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  private saltOrRounds = 10;

  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
    private readonly connectionService: ConnectionService,
    @Inject(CONNECTION)
    private connection: DataSource,
    private jwtService: JwtService,
  ) {}

  async userRepo() {
    return (await this.connectionService.getDataSource('1')).getRepository(
      User,
    );
  }

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string } | null> {
    const adminDataSource = await this.connectionService.getAdminDataSource();
    const user = await adminDataSource.getRepository(Admin).findOneBy({
      email,
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const isMatch = await bcrypt.compare(pass, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    delete user.password;
    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(payload: CreateUser) {
    try {
      // const adminDataSource = await this.connectionService.getAdminDataSource();

      const hashPass = await bcrypt.hash(payload.password, this.saltOrRounds);
      // const user = await adminDataSource.getRepository(Admin).save();
      // await this.connectionService.createTenantDatabase(
      //   user.firstName.toString(),
      // );
      // const dataSource = await this.connectionService.getDataSource(
      //   user.firstName.toString(),
      // );
      // return dataSource.getRepository(User).save({
      //   ...payload,
      //   password: hashPass,
      // });
      const admin = await this.adminRepo.save({
        ...payload,
        password: hashPass,
      });
      const schemaName = `tenant_1`;

      this.adminRepo.query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);
      // export const Manager = myDataSource.manager;
      const myDataSource = await new DataSource(
        getTenantConnection(schemaName),
      ).initialize();

      myDataSource.getRepository(User).save({
        ...payload,
        password: hashPass,
      });
      return admin;
    } catch (e) {
      console.log(e);
    }
  }
}
