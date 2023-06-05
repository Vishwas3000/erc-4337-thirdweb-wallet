import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config/dist';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import { LocalWalletModule } from './local-wallet/local-wallet.module';
import { SmartWalletModule } from './smart-wallet/smart-wallet.module';
import { TransactionModule } from './transaction/transaction.module';
import { NftModule } from './nft/nft.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfigAsync), 
    ConfigModule.forRoot({isGlobal: true}), 
    UserModule, 
    AuthModule, LocalWalletModule, SmartWalletModule, TransactionModule, NftModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
