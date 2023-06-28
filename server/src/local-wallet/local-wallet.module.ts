import { Module } from '@nestjs/common';
import { LocalWalletService } from './local-wallet.service';
import { LocalWalletController } from './local-wallet.controller';
import { UserModule } from 'src/user/user.module';
import { LocalWallet, LocalWalletSchema } from './local-wallet.entity';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  controllers: [LocalWalletController],
  providers: [LocalWalletService],
  imports: [UserModule, MongooseModule.forFeature([{name: LocalWallet.name, schema: LocalWalletSchema}])],
  exports: [LocalWalletService]
})
export class LocalWalletModule {}
