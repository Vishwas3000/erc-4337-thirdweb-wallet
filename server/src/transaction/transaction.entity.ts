import { SmartWallet } from "src/smart-wallet/smart-wallet.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from 'mongoose';
import { Type } from "class-transformer";

export type TransactionDocument = Transaction & Document;

@Schema({timestamps: true})
export class Transaction {
    @Prop({unique: true})
    transaction_hash: string;

    @Prop()
    function_called: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'SmartWallet'})
    @Type(() => SmartWallet)
    smart_wallet: SmartWallet;

    @Prop({type: mongoose.Schema.Types.Mixed})
    transaction_data: any;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

// @Entity()
// export class Transaction extends BaseEntity{
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     @CreateDateColumn()
//     added_at: Date;

//     @Column({unique: true})
//     transaction_hash: string;

//     @Column()
//     function_called: string;

//     @ManyToOne(()=>SmartWallet, (smartWallet)=>smartWallet.transactions)
//     smart_wallet: SmartWallet;

//     @Column({type: 'json', nullable: true})
//     transaction_data:JSON;

// }