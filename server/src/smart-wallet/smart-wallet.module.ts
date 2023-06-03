import { Module } from '@nestjs/common';
import { SmartWalletService } from './smart-wallet.service';
import { SmartWalletController } from './smart-wallet.controller';
import { LocalWalletModule } from 'src/local-wallet/local-wallet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmartWallet } from './smart-wallet.entity';

@Module({
  controllers: [SmartWalletController],
  providers: [SmartWalletService],
  imports : [LocalWalletModule, TypeOrmModule.forFeature([SmartWallet])]
})
export class SmartWalletModule {}
