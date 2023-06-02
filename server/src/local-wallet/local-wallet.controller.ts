import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LocalWalletService } from './local-wallet.service';
import { UserService } from 'src/user/user.service';
import { CreateLocalWalletDto } from './dto/create-local-wallet.dto';

@Controller('local-wallet')
export class LocalWalletController {
  constructor(private readonly localWalletService: LocalWalletService, private readonly userService: UserService) {}

  @Post('/create')
  @UsePipes(ValidationPipe)
  async saveLocalWallet(@Body() wallet:CreateLocalWalletDto){
    const user = await this.userService.getUserByMail(wallet.user_mail_id);

    return await this.localWalletService.createLocalWallet(wallet, user);
  }
}
