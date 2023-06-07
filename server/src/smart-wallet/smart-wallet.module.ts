import { Module } from '@nestjs/common';
import { SmartWalletService } from './smart-wallet.service';
import { SmartWalletController } from './smart-wallet.controller';
import { LocalWalletModule } from 'src/local-wallet/local-wallet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmartWallet } from './smart-wallet.entity';
import { MetamaskWalletModule } from 'src/metamask-wallet/metamask-wallet.module';

@Module({
  controllers: [SmartWalletController],
  providers: [SmartWalletService],
  imports : [LocalWalletModule, TypeOrmModule.forFeature([SmartWallet]), MetamaskWalletModule],
  exports: [SmartWalletService]
})
export class SmartWalletModule {}
