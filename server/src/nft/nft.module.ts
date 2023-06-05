import { Module } from '@nestjs/common';
import { NftService } from './nft.service';
import { NftController } from './nft.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nft } from './nft.entity';
import { SmartWalletModule } from 'src/smart-wallet/smart-wallet.module';

@Module({
  controllers: [NftController],
  providers: [NftService],
  exports: [NftService],
  imports: [TypeOrmModule.forFeature([Nft]),SmartWalletModule ]
})
export class NftModule {}
