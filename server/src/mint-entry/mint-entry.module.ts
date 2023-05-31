import { Module } from '@nestjs/common';
import { MintEntryService } from './mint-entry.service';
import { MintEntryController } from './mint-entry.controller';

@Module({
  controllers: [MintEntryController],
  providers: [MintEntryService]
})
export class MintEntryModule {}
