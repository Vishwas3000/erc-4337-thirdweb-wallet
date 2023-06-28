import { Module } from '@nestjs/common';
import { NftService } from './nft.service';
import { NftController } from './nft.controller';
import { Nft, NftSchema } from './nft.entity';
import { SmartWalletModule } from 'src/smart-wallet/smart-wallet.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [NftController],
  providers: [NftService],
  exports: [NftService],
  imports: [MongooseModule.forFeature([{name:Nft.name, schema: NftSchema}]),SmartWalletModule ]
})
export class NftModule {}
