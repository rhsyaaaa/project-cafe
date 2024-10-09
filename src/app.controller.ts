import { Controller, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(): string {
    return 'ok';
  }

  @Put()
  update(): string {
    return 'ini method update';
  }

  @Get()
  getHello(): string {
    return 'belajar rutin NestJs';
  }

  @Get('list')
  getHello2(): string {
    return 'belajar rutin NestJs 2';
  }
}
