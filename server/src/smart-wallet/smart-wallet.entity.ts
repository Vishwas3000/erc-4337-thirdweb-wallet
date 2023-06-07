import { LocalWallet } from "src/local-wallet/local-wallet.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "src/transaction/transaction.entity";
import { Nft } from "src/nft/nft.entity";
import { MetamaskWallet } from "src/metamask-wallet/metamask-wallet.entity";

@Entity()
export class SmartWallet extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    wallet_address: string;

    @ManyToOne(()=>LocalWallet, (local_wallet)=>local_wallet.smart_wallets)
    local_wallet: LocalWallet;

    @ManyToOne(()=>MetamaskWallet, (metamask_wallet)=>metamask_wallet.smart_wallets)
    metamask_wallet: MetamaskWallet;

    @OneToMany(()=>Transaction, (transaction)=>transaction.smart_wallet)
    transactions: Transaction[];

    @OneToMany(()=>Nft, (nft)=>nft.owner_smart_wallet)
    nfts_created: Nft[];

    @OneToMany(()=>Nft, (nft)=>nft.creator_smart_Wallet) 
    nfts_owned: Nft[];

    @Column()
    @CreateDateColumn()
    added_at: Date;

}