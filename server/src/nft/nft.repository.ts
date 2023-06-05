import { EntityRepository, Repository } from "typeorm";
import { Nft } from "./nft.entity";

@EntityRepository(Nft)
export class NftRepository extends Repository<Nft>{}