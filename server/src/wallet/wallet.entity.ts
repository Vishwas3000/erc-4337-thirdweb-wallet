import { User } from "src/user/user.entity";
import { Entity, BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Wallet extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    wallet_address: string;

    @Column()
    wallet_name: string;

    @ManyToOne(()=>User, (user)=>user.wallets)
    user: User;

    @Column()
    @CreateDateColumn()
    added_at: Date;

}