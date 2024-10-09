/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pengguna } from './auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessTokenStrategy } from './jwtAccessToken.strategy';

@Module({
  imports: [ TypeOrmModule.forFeature([pengguna]),
  JwtModule.register({})
],
  controllers: [AuthController],
  providers: [AuthService, JwtAccessTokenStrategy]
})
export class AuthModule {}
