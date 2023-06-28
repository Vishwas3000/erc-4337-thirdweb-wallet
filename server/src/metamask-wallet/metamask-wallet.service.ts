import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MetamaskWallet, MetamaskWalletDocument } from './metamask-wallet.entity';
import { User, UserDocument } from 'src/user/user.entity';
import { CreateMetamaskWalletDto } from './dto/create-metamask-wallet.dto';
import { SmartWallet } from 'src/smart-wallet/smart-wallet.entity';
import { Model } from 'mongoose';

@Injectable()
export class MetamaskWalletService {
    constructor(@InjectModel(MetamaskWallet.name) private readonly metamaskWalletModel: Model<MetamaskWalletDocument>){}

    async createMetamaskWallet(walletDto: CreateMetamaskWalletDto, user: UserDocument){
        try{
            const {wallet_address} = walletDto;
            const newMetamaskWallet = new this.metamaskWalletModel({wallet_address});
            await newMetamaskWallet.save();
            
            user.metamask_wallets.push(newMetamaskWallet);
            await user.save();
            // console.log('newMetamaskWallet: ', newMetamaskWallet);
            return newMetamaskWallet;

        }catch(error){
            console.log('error: ', error);
            if(error.code === '23505'){
                return await this.metamaskWalletModel.findOne({where:{wallet_address:walletDto.wallet_address}});
            }
        }
    }

    getMetamaskWalletById(id: number):Promise<MetamaskWallet>{
        return this.metamaskWalletModel.findById(id).exec();
    }

    getMetamaskWalletByAddress(wallet_address: string):Promise<MetamaskWalletDocument>{
        return this.metamaskWalletModel.findOne({wallet_address:wallet_address}).exec()
    }

    // getSmartWalletsByMetamaskWalletAddress(wallet_address: string):Promise<SmartWallet[]>{
    //     return this.metamaskWalletRepository.findOne({where:{wallet_address:wallet_address}, relations:{smart_wallets:true}}).then((metamaskWallet)=>{
    //         return metamaskWallet.smart_wallets;
    //     })
    // }
}
