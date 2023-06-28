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

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://ec2-user:password_mongodb@aws-mongodb-cluster.sbcegsr.mongodb.net/'),
    UserModule,
    AuthModule, LocalWalletModule, SmartWalletModule, TransactionModule, NftModule, MetamaskWalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


