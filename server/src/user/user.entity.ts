import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, BeforeInsert, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { LocalWallet } from 'src/local-wallet/local-wallet.entity';

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    @CreateDateColumn()
    createdAy: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
    
    @OneToMany(()=>LocalWallet, (local_wallet)=>local_wallet.user)
    local_wallets: LocalWallet[];

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 8);
    }

    async validatePassword(password: string): Promise<boolean>{
        return bcrypt.compare(password, this.password);
    }
}