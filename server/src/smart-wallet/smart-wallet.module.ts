import { Module } from '@nestjs/common';
import { SmartWalletService } from './smart-wallet.service';
import { SmartWalletController } from './smart-wallet.controller';

@Module({
  controllers: [SmartWalletController],
  providers: [SmartWalletService]
})
export class SmartWalletModule {}
