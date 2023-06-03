import { Repository, EntityRepository } from "typeorm";
import { SmartWallet } from "./smart-wallet.entity";

@EntityRepository(SmartWallet)
export class SmartWalletRepository extends Repository<SmartWallet>{}