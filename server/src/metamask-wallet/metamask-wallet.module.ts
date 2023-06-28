import { Module } from '@nestjs/common';
import { MetamaskWalletService } from './metamask-wallet.service';
import { MetamaskWalletController } from './metamask-wallet.controller';
import { UserModule } from 'src/user/user.module';
import { MetamaskWallet, MetamaskSchema } from './metamask-wallet.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [MetamaskWalletController],
  providers: [MetamaskWalletService],
  exports: [MetamaskWalletService],
  imports: [UserModule, MongooseModule.forFeature([{name:MetamaskWallet.name, schema: MetamaskSchema}])]
})
export class MetamaskWalletModule {}
