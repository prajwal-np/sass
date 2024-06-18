import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { ConnectionModule } from '../connection/connection.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    // TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
  ],
})
export class AuthModule {}
