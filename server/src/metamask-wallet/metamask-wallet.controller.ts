import { Controller, Body, Post, UsePipes, ValidationPipe, Get, Param} from '@nestjs/common';
import { MetamaskWalletService } from './metamask-wallet.service';
import { UserService } from 'src/user/user.service';
import { CreateMetamaskWalletDto } from './dto/create-metamask-wallet.dto';

@Controller('metamask-wallet')
export class MetamaskWalletController {
  constructor(private readonly metamaskWalletService: MetamaskWalletService, private readonly userService: UserService) {}

  @Post('/create')
  @UsePipes(ValidationPipe)
  async saveMetamaskWallet(@Body() walletDto:CreateMetamaskWalletDto){
    const user = await this.userService.getUserByMail(walletDto.user_mail_id);
    // console.log('user: ', user);
    return await this.metamaskWalletService.createMetamaskWallet(walletDto, user);
  }

  @Get(':address')
  async getMetamaskWallet(@Param('address') metamaskWalletAddress: string){
  const metamaskWallet = await this.metamaskWalletService.getMetamaskWalletByAddress(metamaskWalletAddress);
  return metamaskWallet;
  }

  // @Get('/smart-wallets/:address')
  // async getSmartWallets(@Param('address') metamaskWalletAddress: string){
  //   const smartWallets = await this.metamaskWalletService.getSmartWalletsByMetamaskWalletAddress(metamaskWalletAddress);
  //   return smartWallets;
  // }


}
