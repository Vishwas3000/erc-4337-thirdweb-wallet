import { SmartWallet } from "src/smart-wallet/smart-wallet.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from 'mongoose';
import { Type } from "class-transformer";

export type NftDocument = Nft & Document;

@Schema({timestamps: true})
export class Nft {
    @Prop({unique: true})
    nftId: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'SmartWallet'})
    @Type(() => SmartWallet)
    creator_smart_wallet: SmartWallet;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'SmartWallet'})
    @Type(() => SmartWallet)
    owner_smart_wallet: SmartWallet;

    @Prop()
    nft_smart_contract_address: string;

    @Prop({default: 0})
    is_listed: boolean;

    @Prop({default: 0})
    last_listed_price: number;

}

export const NftSchema = SchemaFactory.createForClass(Nft);


// @Entity()
// export class Nft extends BaseEntity{
//     @PrimaryColumn({unique: true})
//     id: number;

//     @ManyToOne(()=>SmartWallet, (smart_wallet)=>smart_wallet.nfts_created)
//     creator_smart_Wallet: SmartWallet;

//     @CreateDateColumn()
//     created_at: Date;

//     @UpdateDateColumn()
//     updated_at: Date;

//     @ManyToOne(()=>SmartWallet, (smart_wallet)=>smart_wallet.nfts_owned)
//     owner_smart_wallet: SmartWallet;

//     @Column()
//     nft_smart_contract_address: string;

//     @Column({default: 0})
//     is_listed: boolean;

//     @Column({default: 0})
//     last_listed_price: number;

// }