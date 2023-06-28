import { Injectable } from '@nestjs/common';
import { Nft, NftDocument } from './nft.entity';
import { CreateNftDto } from './dto/create-nft.dto';
import { SmartWallet, SmartWalletDocument } from 'src/smart-wallet/smart-wallet.entity';
import { UpdateNftOwnerDto } from './dto/update-nftOwner.dto';
import { UpdateNftListingDto } from './dto/update-nftListing.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NftService {
    constructor(@InjectModel(Nft.name) private readonly nftModel: Model<NftDocument>){}

    async createNft(nft: CreateNftDto, smart_wallet: SmartWallet): Promise<Nft>{
        const {id, nft_smart_contract_address} = nft;
        const newNft = new this.nftModel({nftId:id,nft_smart_contract_address: nft_smart_contract_address});

        newNft.owner_smart_wallet = smart_wallet;
        newNft.creator_smart_wallet = smart_wallet;

        return newNft;
    }

    

    async updateNftOwner(nft: UpdateNftOwnerDto, smart_wallet: SmartWallet): Promise<Nft>{
        const updateNft = await this.nftModel.findOne({where:{id:nft.id}, relations:{owner_smart_wallet:true}});
        updateNft.owner_smart_wallet = smart_wallet;
        updateNft.is_listed = false;
        
        await updateNft.save();

        return updateNft;
    }

    async updateNftListing(nft: UpdateNftListingDto): Promise<Nft>{
        const updateNft = await this.nftModel.findOne({where:{id:nft.id}});
        updateNft.is_listed = nft.is_listed;

        if(nft.listing_price)
            updateNft.last_listed_price = nft.listing_price;
            
        await updateNft.save();

        return updateNft;
    }

    async getAllListedNfts(): Promise<Nft[]>{
        const listedNfts = await this.nftModel.find({where:{is_listed:true}, relations:{owner_smart_wallet:true}});

        return listedNfts;
    }

}
