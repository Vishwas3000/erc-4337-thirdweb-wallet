import { Module } from '@nestjs/common';
import { MintEntryService } from './mint-entry.service';
import { MintEntryController } from './mint-entry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MintEntry } from './mint-entry.entity';

@Module({
  controllers: [MintEntryController],
  providers: [MintEntryService],
  imports: [TypeOrmModule.forFeature([MintEntry])],
  exports: [MintEntryService]
})
export class MintEntryModule {}
