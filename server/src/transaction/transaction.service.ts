import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { TransactionRepository } from './transaction.repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { SmartWallet } from 'src/smart-wallet/smart-wallet.entity';

@Injectable()
export class TransactionService {
    constructor(@InjectRepository(Transaction) private transactionRepository: TransactionRepository){}

    async createTransaction(transaction: CreateTransactionDto, smart_wallet: SmartWallet){
        const newTransaction = await this.transactionRepository.save({
            transaction_hash: transaction.transaction_hash,
            function_called: transaction.function_called,
            transaction_data: transaction.transaction_data,
        })

        smart_wallet.transactions = [...smart_wallet.transactions, newTransaction];
        await smart_wallet.save();

        return newTransaction;
    }

    async getTransactionByHash(transaction_hash: string): Promise<Transaction>{
        return await this.transactionRepository.findOne({where:{transaction_hash:transaction_hash}});
    }
}
