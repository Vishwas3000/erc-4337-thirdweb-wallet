import { Injectable } from '@nestjs/common';
import { Transaction, TransactionDocument } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { SmartWallet, SmartWalletDocument } from 'src/smart-wallet/smart-wallet.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TransactionService {
    constructor(@InjectModel(Transaction.name) private transactionModule: Model<TransactionDocument>){}

    async createTransaction(transaction: CreateTransactionDto, smart_wallet: SmartWalletDocument){
        // console.log(transaction);
        const newTransaction = new this.transactionModule({
            transaction_hash: transaction.transaction_hash,
            function_called: transaction.function_called,
            transaction_data: transaction.transaction_data,
        })
        newTransaction.smart_wallet = smart_wallet;
        newTransaction.save();

        smart_wallet.transactions.push(newTransaction);
        await smart_wallet.save();

        return newTransaction.toObject();
    }

    async getTransactionByHash(transaction_hash: string): Promise<Transaction>{
        return await this.transactionModule.findOne({where:{transaction_hash:transaction_hash}});
    }
}
