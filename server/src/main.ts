import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }))
  app.use(cors({
    origin: '*',
  }));
  const configServise = app.get('ConfigService');
  const port = configServise.get<number>('PORT');
  await app.listen(port, () => console.log(`Server started on port ${port}`));
}
bootstrap();
