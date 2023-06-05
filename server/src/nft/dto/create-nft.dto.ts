import { IsNotEmpty } from "class-validator";

export class CreateNftDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    creator_address: string;

    @IsNotEmpty()
    nft_smart_contract_address: string;
}