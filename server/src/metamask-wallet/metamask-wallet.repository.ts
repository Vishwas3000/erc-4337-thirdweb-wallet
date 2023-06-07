import { Repository, EntityRepository } from "typeorm";
import  {MetamaskWallet} from "./metamask-wallet.entity";

@EntityRepository(MetamaskWallet)
export class MetamaskWalletRepository extends Repository<MetamaskWallet>{}