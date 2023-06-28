import { Injectable } from '@nestjs/common';
import { SmartWallet, SmartWalletDocument } from './smart-wallet.entity';
import { CreateSmartWalletDto } from './dto/create-smart-wallert.dto';
import { LocalWallet } from 'src/local-wallet/local-wallet.entity';
import { Nft } from 'src/nft/nft.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SmartWalletService {
    constructor(@InjectModel(SmartWallet.name) private smartWalletModel: Model<SmartWalletDocument>){}

    async createSmartWallet(walletDto: CreateSmartWalletDto, eoa_wallet){

        try{

            const newSmartWallet = new this.smartWalletModel({
                wallet_address: walletDto.wallet_address,
            })

            if(walletDto.eoa_wallet_type === 'localWallet'){
                newSmartWallet.local_wallet = eoa_wallet;
            }else if(walletDto.eoa_wallet_type === 'metamask'){
                newSmartWallet.metamask_wallet = eoa_wallet;
            }
            eoa_wallet.smart_wallets.push(newSmartWallet); 
            await eoa_wallet.save();
            await newSmartWallet.save();

            return newSmartWallet;
        }catch(error){
            console.log('error: ', error);
            if(error.code === '23505'){
                return await this.smartWalletModel.findOne({where:{wallet_address:walletDto.wallet_address}});
            }
        }
    }

    async getSmartWalletByAddress(wallet_address: string){
        return await this.smartWalletModel.findOne({wallet_address:wallet_address}).exec();
    }

    async getAllNftsOwned(wallet_address: string): Promise<Nft[]>{
        const smartWallet = await this.smartWalletModel.findOne({where:{wallet_address:wallet_address}, relations:{nfts_owned:true}});
        return smartWallet.nfts_owned;
    }
}
