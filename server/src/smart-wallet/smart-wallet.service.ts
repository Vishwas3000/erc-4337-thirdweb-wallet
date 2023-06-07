import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SmartWallet } from './smart-wallet.entity';
import { SmartWalletRepository } from './smart-wallet.repository';
import { CreateSmartWalletDto } from './dto/create-smart-wallert.dto';
import { LocalWallet } from 'src/local-wallet/local-wallet.entity';
import { Nft } from 'src/nft/nft.entity';

@Injectable()
export class SmartWalletService {
    constructor(@InjectRepository(SmartWallet) private smartWalletRepository: SmartWalletRepository){}

    async createSmartWallet(wallet: CreateSmartWalletDto, eoa_wallet): Promise<SmartWallet>{

        try{

            const newSmartWallet = await this.smartWalletRepository.save({
                wallet_address: wallet.wallet_address,
            });

            console.log("before: ", eoa_wallet);

            eoa_wallet.smart_wallets = [...eoa_wallet.smart_wallets, newSmartWallet];

            console.log("after: ", eoa_wallet);
            
            await eoa_wallet.save();
            return newSmartWallet;
        }catch(error){
            if(error.code === '23505'){
                return await this.smartWalletRepository.findOne({where:{wallet_address:wallet.wallet_address}});
            }
        }
    }

    async getSmartWalletByAddress(wallet_address: string): Promise<SmartWallet>{
        return await this.smartWalletRepository.findOne(
            {
                where:{
                    wallet_address: wallet_address
                },
                relations:{transactions:true, nfts_created:true, nfts_owned:true}
            })
    }

    async getAllNftsOwned(wallet_address: string): Promise<Nft[]>{
        const smartWallet = await this.smartWalletRepository.findOne({where:{wallet_address:wallet_address}, relations:{nfts_owned:true}});
        return smartWallet.nfts_owned;
    }
}
