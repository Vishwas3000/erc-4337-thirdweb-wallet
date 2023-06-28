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

  await app.listen(3000,() => {console.log(`Server is running on port 3000`)});
}
bootstrap();
