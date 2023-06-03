import { LocalWallet } from "src/local-wallet/local-wallet.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "src/transaction/transaction.entity";

@Entity()
export class SmartWallet extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    wallet_address: string;

    @ManyToOne(()=>LocalWallet, (local_wallet)=>local_wallet.smart_wallets)
    local_wallet: LocalWallet;

    @OneToMany(()=>Transaction, (transaction)=>transaction.smart_wallet)
    transactions: Transaction[];

    @Column()
    @CreateDateColumn()
    added_at: Date;

}