import { Controller } from '@nestjs/common';
import { SmartWalletService } from './smart-wallet.service';
import {Post, UsePipes, ValidationPipe, Body} from '@nestjs/common';
import { CreateSmartWalletDto } from './dto/create-smart-wallert.dto';
import { LocalWalletService } from 'src/local-wallet/local-wallet.service';

@Controller('smart-wallet')
export class SmartWalletController {
  constructor(private readonly smartWalletService: SmartWalletService, private readonly localWalletService: LocalWalletService) {}

  @Post('/create')
  @UsePipes(ValidationPipe)
  async saveSmartWallet(@Body() wallet:CreateSmartWalletDto){
    const localWallet = await this.localWalletService.getLocalWalletByAddress(wallet.local_wallet_address);
    
    return await this.smartWalletService.createSmartWallet(wallet, localWallet);
  }
}
