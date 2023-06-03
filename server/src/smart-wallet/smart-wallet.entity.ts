import { LocalWallet } from "src/local-wallet/local-wallet.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SmartWallet extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    wallet_address: string;

    @ManyToOne(()=>LocalWallet, (local_wallet)=>local_wallet.smart_wallets)
    local_wallet: LocalWallet;

    @Column()
    @CreateDateColumn()
    added_at: Date;

}