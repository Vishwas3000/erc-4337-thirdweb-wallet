import { Controller, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { SmartWalletService } from 'src/smart-wallet/smart-wallet.service';

@Controller('transaction')
export class TransactionController {

  constructor(private readonly transactionService:TransactionService, private smartWalletService:SmartWalletService){}

  @Post('/create')
  @UsePipes(ValidationPipe)
  async saveTransaction(@Body() transaction:CreateTransactionDto){
    console.log(transaction);
    const smartWallet = await this.smartWalletService.getSmartWalletByAddress(transaction.smart_wallet_address);
  
    return await this.transactionService.createTransaction(transaction, smartWallet);
  }
}
