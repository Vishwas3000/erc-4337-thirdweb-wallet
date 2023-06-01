import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UserService } from 'src/user/user.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService, private readonly userService:UserService) {}

  @Post('/create')
  @UsePipes(ValidationPipe)
  async saveWallet(@Body() wallet:CreateWalletDto){
    const user = await this.userService.getUserByMail(wallet.user_mail_id);
    console.log('user', user);

    return await this.walletService.createWallet(wallet, user);
  }
}
