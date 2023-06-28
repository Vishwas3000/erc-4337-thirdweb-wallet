import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import { LocalWalletModule } from './local-wallet/local-wallet.module';
import { SmartWalletModule } from './smart-wallet/smart-wallet.module';
import { TransactionModule } from './transaction/transaction.module';
import { NftModule } from './nft/nft.module';
import { MetamaskWalletModule } from './metamask-wallet/metamask-wallet.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

@Module({
  imports: [
    ConfigModule.forRoot({
      load:[config],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject:[ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    UserModule, 
    AuthModule, LocalWalletModule, SmartWalletModule, TransactionModule, NftModule, MetamaskWalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
