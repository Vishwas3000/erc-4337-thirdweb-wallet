import { Injectable } from '@nestjs/common';
import { LocalWallet, LocalWalletDocument } from './local-wallet.entity';
import { User, UserDocument } from 'src/user/user.entity';
import { CreateLocalWalletDto } from './dto/create-local-wallet.dto';
import { SmartWallet } from 'src/smart-wallet/smart-wallet.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LocalWalletService {
    constructor(@InjectModel(LocalWallet.name) private readonly localWalletModel: Model<LocalWalletDocument>){}

    async createLocalWallet(walletDto: CreateLocalWalletDto, user: UserDocument): Promise<LocalWallet>{

        try{
            const {wallet_address, wallet_encrypted_data} = walletDto;
            const newLocalWallet = new this.localWalletModel({wallet_address: wallet_address, wallet_encrypted_data: wallet_encrypted_data

            })
            await newLocalWallet.save();
            console.log('newLocalWallet: ', newLocalWallet);

            user.local_wallets.push(newLocalWallet);
            await user.save();

            return newLocalWallet.toObject();

        }catch(error){
            console.log('error: ', error);
            if(error.code === '23505'){
                return await this.localWalletModel.findOne({where:{wallet_address:walletDto.wallet_address}});
            }
        }
    }

    getLocalWalletById(id: number):Promise<LocalWalletDocument>{
        return this.localWalletModel.findById(id).exec();
    }

    getLocalWalletByAddress(wallet_address: string){
        return this.localWalletModel.findOne({wallet_address:wallet_address}).exec()
    }

    // getSmartWalletsByLocalWalletAddress(wallet_address: string):Promise<SmartWallet[]>{
    //     return this.localWalletModel.findOne({where:{wallet_address:wallet_address}, relations:{smart_wallets:true}}).then((localWallet)=>{
    //         return localWallet.smart_wallets;
    //     })
    // }
}
