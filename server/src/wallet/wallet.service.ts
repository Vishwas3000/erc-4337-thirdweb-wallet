import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { WalletRepository } from './wallet.repository';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class WalletService {
    constructor(@InjectRepository(Wallet) private walletRepository:WalletRepository){}

    async createWallet(wallet: CreateWalletDto, user:User){
        const newWallet = await this.walletRepository.save({
            wallet_address: wallet.wallet_address,
            wallet_name: wallet.wallet_name,
        });

        user.wallets = [...user.wallets, newWallet];
        await user.save();
        return newWallet;
    }

    getWalletById(id: number):Promise<Wallet>{
        return this.walletRepository.findOneBy({id:id});
    }
}
