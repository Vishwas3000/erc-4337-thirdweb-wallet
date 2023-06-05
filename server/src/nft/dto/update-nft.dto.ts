import { IsNotEmpty } from "class-validator";

export class UpdateNftDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    new_owner_smart_wallet_address: string;
}