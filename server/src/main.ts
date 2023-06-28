import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }))
  // app.use(cors({
  //   origin: '*',
  // }));
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');


  await app.listen(port, () => {console.log(`Server is running on port ${port}}`)});
}
bootstrap();
