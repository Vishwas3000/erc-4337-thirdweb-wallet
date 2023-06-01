import { IsNotEmpty } from "class-validator";

export class CreateMintEntryDto{
    @IsNotEmpty({message: 'Mint Entry cannot be empty'})
    id: number;

    @IsNotEmpty({message: 'Wallet Address cannot be empty'})
    wallet_address: string;

    @IsNotEmpty({message: 'Token ID cannot be empty'})
    token_id: number;

}