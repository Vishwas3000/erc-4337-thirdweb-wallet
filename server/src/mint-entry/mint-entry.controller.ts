import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { MintEntryService } from './mint-entry.service';
import { CreateMintEntryDto } from './dto/create-mint-entry.dto';

@Controller('mint-entry')
export class MintEntryController {
  constructor(private readonly mintEntryService: MintEntryService) {}

  @Post('/create')
  @UsePipes(ValidationPipe)
  async createMintEntry(@Body() mintEntryData: CreateMintEntryDto) {
    return await this.mintEntryService.createMintEntry(mintEntryData);
  }

  @Get('/id')
  showById(@Param('id') id: number) {
    return this.mintEntryService.showById(id);
  }
}
