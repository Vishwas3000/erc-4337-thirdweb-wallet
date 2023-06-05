import { Controller, Post, ValidationPipe, UsePipes, Body, Get, Param} from '@nestjs/common';
import { NftService } from './nft.service';
import { CreateNftDto } from './dto/create-nft.dto';
import { SmartWalletService } from 'src/smart-wallet/smart-wallet.service';
import { UpdateNftDto } from './dto/update-nft.dto';

@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService, private readonly smartWalletService: SmartWalletService) {}

  @Post('/create')
  @UsePipes(ValidationPipe)
  async createNft(@Body() nft:CreateNftDto){
    const creatorSmartWallet = await this.smartWalletService.getSmartWalletByAddress(nft.creator_address);
    return await this.nftService.createNft(nft, creatorSmartWallet);
  }

  @Post('/update')
  @UsePipes(ValidationPipe)
  async updateNft(@Body() nft:UpdateNftDto){
    const ownerSmartWallet = await this.smartWalletService.getSmartWalletByAddress(nft.new_owner_smart_wallet_address);
    await this.nftService.updateNft(nft, ownerSmartWallet);
  }

  @Get(':address')
  async getAllNftsOwned(@Param('address') owner_smart_wallet_address: string){
    const nfts = await this.smartWalletService.getAllNftsOwned(owner_smart_wallet_address);
    return nfts;
  }
}
