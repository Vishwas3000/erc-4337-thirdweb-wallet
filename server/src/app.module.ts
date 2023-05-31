import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config/dist';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmConfigAsync), ConfigModule.forRoot({isGlobal: true}), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
