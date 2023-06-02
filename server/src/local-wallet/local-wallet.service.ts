import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocalWallet } from './local-wallet.entity';
import { LocalWalletRepository } from './local-wallet.repository';
import { User } from 'src/user/user.entity';
import { CreateLocalWalletDto } from './dto/create-local-wallet.dto';

@Injectable()
export class LocalWalletService {
    constructor(@InjectRepository(LocalWallet) private readonly localWalletRepository: LocalWalletRepository){}

    async createLocalWallet(wallet: CreateLocalWalletDto, user: User): Promise<LocalWallet>{
        const newLocalWallet = await this.localWalletRepository.save({
            wallet_address: wallet.wallet_address,
            wallet_encrypted_data: wallet.wallet_encrypted_data,
        });

        user.local_wallets = [...user.local_wallets, newLocalWallet];
        await user.save();
        return newLocalWallet;
    }

    getLocalWalletById(id: number):Promise<LocalWallet>{
        return this.localWalletRepository.findOneBy({id:id});
    }
}
