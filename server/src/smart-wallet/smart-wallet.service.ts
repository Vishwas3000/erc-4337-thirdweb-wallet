import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SmartWallet } from './smart-wallet.entity';
import { SmartWalletRepository } from './smart-wallet.repository';
import { CreateSmartWalletDto } from './dto/create-smart-wallert.dto';
import { LocalWallet } from 'src/local-wallet/local-wallet.entity';

@Injectable()
export class SmartWalletService {
    constructor(@InjectRepository(SmartWallet) private smartWalletRepository: SmartWalletRepository){}

    async createSmartWallet(wallet: CreateSmartWalletDto, local_wallet: LocalWallet): Promise<SmartWallet>{
        const newSmartWallet = await this.smartWalletRepository.save({
            wallet_address: wallet.wallet_address,
        });
        
        local_wallet.smart_wallets = [...local_wallet.smart_wallets, newSmartWallet];

        await local_wallet.save();
        return newSmartWallet;
    }

    async getSmartWalletByAddress(wallet_address: string): Promise<SmartWallet>{
        return await this.smartWalletRepository.findOne(
            {
                where:{
                    wallet_address: wallet_address
                },
                relations:{transactions:true}
            })
    }
}
