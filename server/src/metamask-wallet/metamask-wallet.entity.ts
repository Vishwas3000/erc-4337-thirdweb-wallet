import { User } from "src/user/user.entity";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document} from 'mongoose';
import * as mongoose from 'mongoose';
import { Type } from 'class-transformer';
import { SmartWallet } from "src/smart-wallet/smart-wallet.entity";

export type MetamaskWalletDocument = MetamaskWallet & Document;

@Schema({timestamps: true})
export class MetamaskWallet {
    @Prop({unique: true})
    wallet_address: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    @Type(() => User)
    user: User;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SmartWallet' }] })
    @Type(() => SmartWallet)
    smart_wallets: SmartWallet[];
}

export const MetamaskSchema = SchemaFactory.createForClass(MetamaskWallet);

