import { LocalWallet } from "src/local-wallet/local-wallet.entity";
import { Transaction } from "src/transaction/transaction.entity";
import { Nft } from "src/nft/nft.entity";
import { MetamaskWallet } from "src/metamask-wallet/metamask-wallet.entity";
import { Document } from "mongodb";
import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Type } from "class-transformer";

export type SmartWalletDocument = SmartWallet & Document;

@Schema({timestamps: true})
export class SmartWallet {
    @Prop({unique: true})
    wallet_address: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'LocalWallet'})
    @Type(() => LocalWallet)
    local_wallet: LocalWallet;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'MetamaskWallet'})
    @Type(() => MetamaskWallet)
    metamask_wallet: MetamaskWallet;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }] })
    @Type(() => Transaction)
    transactions: Transaction[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Nft' }] })
    @Type(() => Nft)
    nfts_created: Nft[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Nft' }] })
    @Type(() => Nft)
    nfts_owned: Nft[];
}

export const SmartWalletSchema = SchemaFactory.createForClass(SmartWallet);

// @Entity()
// export class SmartWallet extends BaseEntity{
//     @ObjectIdColumn()
//     id: number;

//     @Column({unique: true})
//     wallet_address: string;

//     @ManyToOne(()=>LocalWallet, (local_wallet)=>local_wallet.smart_wallets)
//     local_wallet: LocalWallet;

//     @ManyToOne(()=>MetamaskWallet, (metamask_wallet)=>metamask_wallet.smart_wallets)
//     metamask_wallet: MetamaskWallet;

//     @OneToMany(()=>Transaction, (transaction)=>transaction.smart_wallet)
//     transactions: Transaction[];

//     @OneToMany(()=>Nft, (nft)=>nft.owner_smart_wallet)
//     nfts_created: Nft[];

//     @OneToMany(()=>Nft, (nft)=>nft.creator_smart_Wallet) 
//     nfts_owned: Nft[];

//     @Column()
//     @CreateDateColumn()
//     added_at: Date;

// }