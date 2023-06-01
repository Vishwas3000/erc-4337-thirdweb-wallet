import { Entity, BaseEntity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class MintEntry extends BaseEntity{
    @PrimaryColumn()
    id: number;

    @Column()
    wallet_address: string;

    @Column()
    token_id: number;

    @Column()
    @CreateDateColumn()
    minted_at: Date;
}