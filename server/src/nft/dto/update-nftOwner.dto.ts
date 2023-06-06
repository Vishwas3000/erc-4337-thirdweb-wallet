import { IsNotEmpty } from "class-validator";

export class UpdateNftOwnerDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    new_owner_smart_wallet_address: string;
}