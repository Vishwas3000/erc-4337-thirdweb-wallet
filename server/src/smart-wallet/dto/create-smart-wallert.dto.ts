import { IsNotEmpty } from "class-validator";

export class CreateSmartWalletDto {
    @IsNotEmpty()
    wallet_address: string;

    @IsNotEmpty()
    local_wallet_address: string;
}