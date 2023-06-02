import { Module } from '@nestjs/common';
import { LocalWalletService } from './local-wallet.service';
import { LocalWalletController } from './local-wallet.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalWallet } from './local-wallet.entity';

@Module({
  controllers: [LocalWalletController],
  providers: [LocalWalletService],
  imports: [UserModule, TypeOrmModule.forFeature([LocalWallet])],
})
export class LocalWalletModule {}
