import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [WalletController],
  imports: [TypeOrmModule.forFeature([Wallet]), UserModule],
  providers: [WalletService],
  exports: [WalletService],
  
})
export class WalletModule {}
