import { IsNotEmpty } from "class-validator";

export class UpdateNftListingDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    is_listed: boolean;
}