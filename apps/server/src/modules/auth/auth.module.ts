import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { Admin } from 'src/adminEntity/admin.entity';
import { User } from 'src/entity/user.entity';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([Admin, User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
  ],
})
export class AuthModule {}
