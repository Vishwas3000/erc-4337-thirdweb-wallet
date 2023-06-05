import { Body, Controller, Post, UsePipes, ValidationPipe, Get, Param } from '@nestjs/common';
import { LocalWalletService } from './local-wallet.service';
import { UserService } from 'src/user/user.service';
import { CreateLocalWalletDto } from './dto/create-local-wallet.dto';
import { SmartWallet } from 'src/smart-wallet/smart-wallet.entity';

@Controller('local-wallet')
export class LocalWalletController {
  constructor(private readonly localWalletService: LocalWalletService, private readonly userService: UserService) {}

  @Post('/create')
  @UsePipes(ValidationPipe)
  async saveLocalWallet(@Body() wallet:CreateLocalWalletDto){
    const user = await this.userService.getUserByMail(wallet.user_mail_id);

    return await this.localWalletService.createLocalWallet(wallet, user);
  }

  @Get(':address')
  async getLocalWallet(@Param('address') localWalletAddress: string){
    const localWallet = await this.localWalletService.getLocalWalletByAddress(localWalletAddress);
    return localWallet;
  }

  @Get('/smart-wallets/:address')
  async getSmartWallets(@Param('address') localWalletAddress: string):Promise<SmartWallet[]>{
    const smartWallets = await this.localWalletService.getSmartWalletsByLocalWalletAddress(localWalletAddress);
    return smartWallets;
  }
}
