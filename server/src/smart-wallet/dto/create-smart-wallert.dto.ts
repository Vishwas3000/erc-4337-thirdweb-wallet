import { IsNotEmpty } from "class-validator";

export class CreateSmartWalletDto {
    @IsNotEmpty()
    wallet_address: string;

    @IsNotEmpty()
    eoa_wallet_type: string;

    @IsNotEmpty()
    eoa_wallet_address: string;
}