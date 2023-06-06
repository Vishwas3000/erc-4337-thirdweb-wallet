import { Controller, Post, ValidationPipe, UsePipes, Body, Get, Param} from '@nestjs/common';
import { NftService } from './nft.service';
import { CreateNftDto } from './dto/create-nft.dto';
import { SmartWalletService } from 'src/smart-wallet/smart-wallet.service';
import { UpdateNftOwnerDto } from './dto/update-nftOwner.dto';
import { UpdateNftListingDto } from './dto/update-nftListing.dto';

@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService, private readonly smartWalletService: SmartWalletService) {}

  @Post('/create')
  @UsePipes(ValidationPipe)
  async createNft(@Body() nft:CreateNftDto){
    const creatorSmartWallet = await this.smartWalletService.getSmartWalletByAddress(nft.creator_address);
    return await this.nftService.createNft(nft, creatorSmartWallet);
  }

  @Post('/update/owner')
  @UsePipes(ValidationPipe)
  async updateNft(@Body() nft:UpdateNftOwnerDto){
    const ownerSmartWallet = await this.smartWalletService.getSmartWalletByAddress(nft.new_owner_smart_wallet_address);
    return await this.nftService.updateNftOwner(nft, ownerSmartWallet);
  }

  @Post('/update/listing')
  @UsePipes(ValidationPipe)
  async updateNftListing(@Body() nft:UpdateNftListingDto){
    return await this.nftService.updateNftListing(nft);
  }

  @Get(':address')
  async getAllNftsOwned(@Param('address') owner_smart_wallet_address: string){
    const nfts = await this.smartWalletService.getAllNftsOwned(owner_smart_wallet_address);
    return nfts;
  }

  @Get('/')
  async getAllListedNfts(){
    const nfts = await this.nftService.getAllListedNfts();
    return nfts;
  }
}
