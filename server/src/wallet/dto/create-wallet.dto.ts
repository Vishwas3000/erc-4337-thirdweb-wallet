import { IsNotEmpty } from "class-validator";

export class CreateWalletDto {

    @IsNotEmpty()
    wallet_address: string;
    
    @IsNotEmpty()
    wallet_name: string;

    @IsNotEmpty()
    user_mail_id: string;
}