import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Transaction, TransactionSchema } from './transaction.entity';
import { SmartWalletModule } from 'src/smart-wallet/smart-wallet.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports : [MongooseModule.forFeature([{name:Transaction.name, schema:TransactionSchema}]), SmartWalletModule],
  exports: [TransactionService]
})
export class TransactionModule {}
