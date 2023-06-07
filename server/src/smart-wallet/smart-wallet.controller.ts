import { Controller } from '@nestjs/common';
import { SmartWalletService } from './smart-wallet.service';
import {Post, UsePipes, ValidationPipe, Body, Param, Get} from '@nestjs/common';
import { CreateSmartWalletDto } from './dto/create-smart-wallert.dto';
import { LocalWalletService } from 'src/local-wallet/local-wallet.service';
import { MetamaskWalletService } from 'src/metamask-wallet/metamask-wallet.service';
import { Nft } from 'src/nft/nft.entity';

@Controller('smart-wallet')
export class SmartWalletController {
  constructor(private readonly smartWalletService: SmartWalletService, private readonly localWalletService: LocalWalletService, private readonly metamaskWalletService: MetamaskWalletService) {}

  @Post('/create')
  @UsePipes(ValidationPipe)
  async saveSmartWallet(@Body() wallet:CreateSmartWalletDto){
    let eoaWallet = null;
    if(wallet.eoa_wallet_type === 'localWallet'){

      eoaWallet = await this.localWalletService.getLocalWalletByAddress(wallet.eoa_wallet_address);
    }else if(wallet.eoa_wallet_type === 'metamask'){
      eoaWallet = await this.metamaskWalletService.getMetamaskWalletByAddress(wallet.eoa_wallet_address);
    }
    
    return await this.smartWalletService.createSmartWallet(wallet, eoaWallet);
  }

  @Get('/nfts/:address')
  async getNFTs(@Param('address')smartWalletAddress: string):Promise<Nft[]>{
    return await this.smartWalletService.getAllNftsOwned(smartWalletAddress);
  }
}
