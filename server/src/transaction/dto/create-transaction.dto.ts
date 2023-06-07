import { IsJSON, IsNotEmpty } from "class-validator";

export class CreateTransactionDto{
    @IsNotEmpty()
    transaction_hash: string;

    @IsNotEmpty()
    function_called: string;

    @IsNotEmpty()
    smart_wallet_address: string;

    @IsJSON()
    transaction_data: JSON;
} 