import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "src/user/user.entity";

@Entity()
export class LocalWallet extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    wallet_address: string;

    @ManyToOne(()=>User, (user)=>user.local_wallets)
    user: User;

    @Column()
    @CreateDateColumn()
    added_at: Date;

    @Column("json")
    wallet_encrypted_data: JSON;
}