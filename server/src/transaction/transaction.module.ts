import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { SmartWalletModule } from 'src/smart-wallet/smart-wallet.module';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports : [TypeOrmModule.forFeature([Transaction]), SmartWalletModule],
  exports: [TransactionService]
})
export class TransactionModule {}
