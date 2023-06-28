import * as bcrypt from 'bcryptjs';
import { LocalWallet, LocalWalletSchema } from 'src/local-wallet/local-wallet.entity';
import { MetamaskWallet, MetamaskSchema } from 'src/metamask-wallet/metamask-wallet.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document} from 'mongoose';

export type UserDocument = User & Document;

@Schema({timestamps: true})
export class User {
    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({ type: [{ type: MetamaskSchema }] })
    metamask_wallets: MetamaskWallet[];

    @Prop({ type: [{ type: LocalWalletSchema }] })
    local_wallets: LocalWallet[];

    async validatePassword(password: string): Promise<boolean>{
        return bcrypt.compare(password, this.password);
    }
    
}

export const UserSchema = SchemaFactory.createForClass(User);

// @Entity()
// export class User extends BaseEntity{
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column({unique: true})
//     email: string;

//     @Column()
//     password: string;

//     @Column()
//     @CreateDateColumn()
//     createdAy: Date;

//     @Column()
//     @UpdateDateColumn()
//     updatedAt: Date;
    
//     @OneToMany(()=>LocalWallet, (local_wallet)=>local_wallet.user)
//     local_wallets: LocalWallet[];

//     @OneToMany(()=>MetamaskWallet, (metamask_wallet)=>metamask_wallet.user)
//     metamask_wallets: MetamaskWallet[];

//     @BeforeInsert()
//     async hashPassword(){
//         this.password = await bcrypt.hash(this.password, 8);
//     }

//     async validatePassword(password: string): Promise<boolean>{
//         return bcrypt.compare(password, this.password);
//     }
// }