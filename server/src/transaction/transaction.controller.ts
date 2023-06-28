import { Controller, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { SmartWalletService } from 'src/smart-wallet/smart-wallet.service';

@Controller('transaction')
export class TransactionController {

  constructor(private readonly transactionService:TransactionService, private smartWalletService:SmartWalletService){}

  @Post('/create')
  @UsePipes(ValidationPipe)
  async saveTransaction(@Body() transactionDto:CreateTransactionDto){
    try{
      const smartWallet = (await this.smartWalletService.getSmartWalletByAddress(transactionDto.smart_wallet_address)).toObject();
    
      return await this.transactionService.createTransaction(transactionDto, smartWallet);

    }catch(err){
      if(err.code === '23505'){
        const transaction = await this.transactionService.getTransactionByHash(transactionDto.transaction_hash);
        throw new Error('Transaction already exists');
        return  transaction;
      }
    }
  }
}
