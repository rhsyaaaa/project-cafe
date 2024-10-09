/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist : true,
      forbidNonWhitelisted : true,
      transform : true,
      validateCustomDecorators : true,
      transformOptions : {
        enableImplicitConversion : true 
      }
    })
  )
  await app.listen(4000);
}
bootstrap();
