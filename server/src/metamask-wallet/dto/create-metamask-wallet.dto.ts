import { IsNotEmpty} from 'class-validator';

export class CreateMetamaskWalletDto {
    @IsNotEmpty()
    wallet_address: string;

    @IsNotEmpty()
    user_mail_id: string;    
}