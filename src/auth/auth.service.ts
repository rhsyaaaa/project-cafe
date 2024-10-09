/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pengguna } from './auth.entity';
import { Repository } from 'typeorm';
import { LoginDto, RegisterDto } from './auth.dto';
import { compare, hash } from 'bcrypt';
import { BaseResponse } from 'src/utils/response.utils';
import { responseSuccess } from 'src/interface';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService extends BaseResponse {
  constructor(
    @InjectRepository(pengguna) private readonly authRepository: Repository<pengguna>,
    private jwtService: JwtService,
  ) {
    super();
  }

  generateJWT(payload: jwtPayload, expiresIn: string | number, token: string) {
    return this.jwtService.sign(payload, {
      secret: token,
      expiresIn: expiresIn,
    });
  }

  async register(payload: RegisterDto): Promise<responseSuccess> {
    const checkUserExists = await this.authRepository.findOne({
      where: {
        email: payload.email,
      },
    });
    if (checkUserExists) {
      throw new HttpException('User already registered', HttpStatus.FOUND);
    }

    payload.password = await hash(payload.password, 12);
    await this.authRepository.save(payload);

    return this._success('Register Berhasil');
  }

  async login(payload: LoginDto): Promise<responseSuccess> {
    const checkUserExists = await this.authRepository.findOne({
      where: {
        email: payload.email,
      },
      select: {
        id: true,
        nama: true,
        email: true,
        password: true,
        refresh_token: true,
      },
    });

    if (!checkUserExists) {
      throw new HttpException(
        'User tidak ditemukan',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const checkPassword = await compare(
      payload.password,
      checkUserExists.password,
    );
    if (checkPassword) {
      const jwtPayload: jwtPayload = {
        id: checkUserExists.id,
        nama: checkUserExists.nama,
        email: checkUserExists.email,
      };
      const access_token = await this.generateJWT(
        jwtPayload,
        '1d',
        process.env.ACCESS_TOKEN_SECRET,
      );
      return this._success('Login Success', {... checkUserExists, access_token});
    } else {
      throw new HttpException(
        'email dan password tidak sama',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
