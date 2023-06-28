import { User } from "src/user/user.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";
import * as mongoose from 'mongoose';
import { Type } from "class-transformer";
import { SmartWallet } from "src/smart-wallet/smart-wallet.entity";

export type LocalWalletDocument = LocalWallet & Document;

@Schema({timestamps: true})
export class LocalWallet {
    @Prop({unique: true})
    wallet_address: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    @Type(() => User)
    user: User;

    @Prop({ type: SchemaTypes.Mixed })
    wallet_encrypted_data: any;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SmartWallet' }] })
    @Type(() => SmartWallet)
    smart_wallets: SmartWallet[];

}
export const LocalWalletSchema = SchemaFactory.createForClass(LocalWallet);

// @Entity()
// export class LocalWallet extends BaseEntity{
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column({unique: true})
//     wallet_address: string;

//     @ManyToOne(()=>User, (user)=>user.local_wallets)
//     user: User;

//     @OneToMany(()=>SmartWallet, (smart_wallet)=>smart_wallet.local_wallet)
//     smart_wallets: SmartWallet[];

//     @Column()
//     @CreateDateColumn()
//     added_at: Date;

//     @Column("json")
//     wallet_encrypted_data: JSON;
// }
