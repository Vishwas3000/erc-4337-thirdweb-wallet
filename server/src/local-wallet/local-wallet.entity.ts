import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "src/user/user.entity";
import { SmartWallet } from "src/smart-wallet/smart-wallet.entity";

@Entity()
export class LocalWallet extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    wallet_address: string;

    @ManyToOne(()=>User, (user)=>user.local_wallets)
    user: User;

    @OneToMany(()=>SmartWallet, (smart_wallet)=>smart_wallet.local_wallet)
    smart_wallets: SmartWallet[];

    @Column()
    @CreateDateColumn()
    added_at: Date;

    @Column("json")
    wallet_encrypted_data: JSON;
}