import { Module } from '@nestjs/common';
import { MetamaskWalletService } from './metamask-wallet.service';
import { MetamaskWalletController } from './metamask-wallet.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetamaskWallet } from './metamask-wallet.entity';

@Module({
  controllers: [MetamaskWalletController],
  providers: [MetamaskWalletService],
  exports: [MetamaskWalletService],
  imports: [UserModule, TypeOrmModule.forFeature([MetamaskWallet])]
})
export class MetamaskWalletModule {}
