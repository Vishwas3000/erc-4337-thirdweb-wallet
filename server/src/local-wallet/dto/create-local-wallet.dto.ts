import { IsNotEmpty, } from 'class-validator';

export class CreateLocalWalletDto {
    @IsNotEmpty()
    wallet_address: string;

    @IsNotEmpty()
    user_mail_id: string;

    @IsNotEmpty()
    wallet_encrypted_data: JSON;
    
}