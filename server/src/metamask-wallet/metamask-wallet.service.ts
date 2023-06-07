import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetamaskWallet } from './metamask-wallet.entity';
import { MetamaskWalletRepository } from './metamask-wallet.repository';
import { User } from 'src/user/user.entity';
import { CreateMetamaskWalletDto } from './dto/create-metamask-wallet.dto';
import { SmartWallet } from 'src/smart-wallet/smart-wallet.entity';

@Injectable()
export class MetamaskWalletService {
    constructor(@InjectRepository(MetamaskWallet) private readonly metamaskWalletRepository: MetamaskWalletRepository){}

    async createMetamaskWallet(wallet: CreateMetamaskWalletDto, user: User): Promise<MetamaskWallet>{
        try{
            const newMetamaskWallet = await this.metamaskWalletRepository.save({
                wallet_address: wallet.wallet_address,
            });
    
            user.metamask_wallets = [...user.metamask_wallets, newMetamaskWallet];
            await user.save();
            return newMetamaskWallet;

        }catch(error){
            if(error.code === '23505'){
                return await this.metamaskWalletRepository.findOne({where:{wallet_address:wallet.wallet_address}});
            }
        }
    }

    getMetamaskWalletById(id: number):Promise<MetamaskWallet>{
        return this.metamaskWalletRepository.findOne({where:{id:id}, relations:{smart_wallets:true}});
    }

    getMetamaskWalletByAddress(wallet_address: string):Promise<MetamaskWallet>{
        return this.metamaskWalletRepository.findOne({where:{wallet_address:wallet_address}, relations:{smart_wallets:true}})
    }

    getSmartWalletsByMetamaskWalletAddress(wallet_address: string):Promise<SmartWallet[]>{
        return this.metamaskWalletRepository.findOne({where:{wallet_address:wallet_address}, relations:{smart_wallets:true}}).then((metamaskWallet)=>{
            return metamaskWallet.smart_wallets;
        })
    }
}
