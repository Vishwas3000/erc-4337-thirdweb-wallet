import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config/dist';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MintEntryModule } from './mint-entry/mint-entry.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfigAsync), 
    ConfigModule.forRoot({isGlobal: true}), 
    UserModule, 
    AuthModule, MintEntryModule, WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
