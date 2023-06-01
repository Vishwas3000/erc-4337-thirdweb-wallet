import { Repository, EntityRepository } from "typeorm";
import { MintEntry } from "./mint-entry.entity";

@EntityRepository(MintEntry)
export class MintEntryRepository extends Repository<MintEntry> {}