import { SmartWallet } from "src/smart-wallet/smart-wallet.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Nft extends BaseEntity{
    @PrimaryColumn({unique: true})
    id: number;

    @ManyToOne(()=>SmartWallet, (smart_wallet)=>smart_wallet.nfts_created)
    creator_smart_Wallet: SmartWallet;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(()=>SmartWallet, (smart_wallet)=>smart_wallet.nfts_owned)
    owner_smart_wallet: SmartWallet;

    @Column()
    nft_smart_contract_address: string;

    @Column({default: 0})
    is_listed: boolean;

}