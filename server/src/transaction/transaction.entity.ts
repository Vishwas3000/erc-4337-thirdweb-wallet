import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne} from "typeorm";
import { SmartWallet } from "src/smart-wallet/smart-wallet.entity";

@Entity()
export class Transaction extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @CreateDateColumn()
    added_at: Date;

    @Column({unique: true})
    transaction_hash: string;

    @Column()
    function_called: string;

    @ManyToOne(()=>SmartWallet, (smartWallet)=>smartWallet.transactions)
    smart_wallet: SmartWallet;

    @Column({type: 'json', nullable: true})
    transaction_data:JSON;

}