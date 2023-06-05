import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nft } from './nft.entity';
import { NftRepository } from './nft.repository';
import { CreateNftDto } from './dto/create-nft.dto';
import { SmartWallet } from 'src/smart-wallet/smart-wallet.entity';
import { UpdateNftDto } from './dto/update-nft.dto';

@Injectable()
export class NftService {
    constructor(@InjectRepository(Nft) private readonly nftRepository: NftRepository){}

    async createNft(nft: CreateNftDto, smart_wallet: SmartWallet): Promise<Nft>{
        const newNft = await this.nftRepository.save({
            id: nft.id,
            nft_smart_contract_address: nft.nft_smart_contract_address,
        });
        smart_wallet.nfts_owned = [...smart_wallet.nfts_owned, newNft];

        smart_wallet.nfts_created = [...smart_wallet.nfts_created, newNft];
        
        await smart_wallet.save();
        return newNft;
    }

    async updateNft(nft: UpdateNftDto, smart_wallet: SmartWallet): Promise<Nft>{
        const updateNft = await this.nftRepository.findOne({where:{id:nft.id}, relations:{owner_smart_wallet:true}});
        updateNft.owner_smart_wallet = smart_wallet;
        await updateNft.save();

        return updateNft;
    }

}
