import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/user.entity";
import { SmartWallet } from "src/smart-wallet/smart-wallet.entity";

@Entity()
export class MetamaskWallet extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    wallet_address: string;

    @ManyToOne(()=>User, (user)=>user.metamask_wallets)
    user: User;

    @OneToMany(()=>SmartWallet, (smart_wallet)=>smart_wallet.metamask_wallet)
    smart_wallets: SmartWallet[];

    @Column()
    @CreateDateColumn()
    added_at: Date;
}