import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { LocalStrategy } from 'src/strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/configs/jwt.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig)
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
