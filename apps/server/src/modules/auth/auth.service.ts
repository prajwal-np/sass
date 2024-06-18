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
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConnectionService } from '../connection/connection.service';
import { Admin } from 'src/entity/admin.entity';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  private saltOrRounds = 10;
  private userRepo: Repository<User>;
  private adminRepo: Repository<Admin>;

  constructor(
    // @InjectRepository(User)
    // private userRepo: Repository<User>,
    private readonly connectionService: ConnectionService,
    private jwtService: JwtService,
  ) {
    const dataSource = this.connectionService.getAdminDataSource();
    dataSource.then((data) => {
      if (data) {
        this.adminRepo = data.getRepository(Admin);
      }
    });
  }

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string } | null> {
    const user = await this.userRepo.findOneBy({
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
    const adminDataSource = await this.connectionService.getAdminDataSource();

    const hashPass = await bcrypt.hash(payload.password, this.saltOrRounds);
    const user = await adminDataSource.getRepository(Admin).save({
      ...payload,
      password: hashPass,
    });

    await this.connectionService.createTenantDatabase(user.id.toString());
    // Optionally, you can perform additional initialization tasks here
    const dataSource = await this.connectionService.getDataSource(
      user.id.toString(),
    );
    return dataSource.getRepository(User).save({
      ...payload,
      password: hashPass,
    });
  }
}
