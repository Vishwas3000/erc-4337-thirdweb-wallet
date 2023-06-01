import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MintEntry } from './mint-entry.entity';
import { MintEntryRepository } from './mint-entry.repository';
import { CreateMintEntryDto } from './dto/create-mint-entry.dto';

@Injectable()
export class MintEntryService {
    constructor(@InjectRepository(MintEntry) private mintEntryRepository:MintEntryRepository){}

    async createMintEntry(mintEntry:CreateMintEntryDto): Promise<MintEntry> {       
        const newMintEntry = await this.mintEntryRepository.save(mintEntry);
        return newMintEntry;
    }

    async showById(id: number){
        const mintEntry = await this.mintEntryRepository.findOneBy({id:id});
        return mintEntry;
    }
}
