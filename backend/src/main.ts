import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { config } from './config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(config.app.port);
}
bootstrap();
