import { Module } from '@nestjs/common';
import { SmartWalletService } from './smart-wallet.service';
import { SmartWalletController } from './smart-wallet.controller';
import { LocalWalletModule } from 'src/local-wallet/local-wallet.module';
import { SmartWallet, SmartWalletSchema } from './smart-wallet.entity';
import { MetamaskWalletModule } from 'src/metamask-wallet/metamask-wallet.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [SmartWalletController],
  providers: [SmartWalletService],
  imports : [LocalWalletModule, MongooseModule.forFeature([{name:SmartWallet.name, schema: SmartWalletSchema}]), MetamaskWalletModule],
  exports: [SmartWalletService]
})
export class SmartWalletModule {}
