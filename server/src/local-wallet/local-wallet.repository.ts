import {Repository, EntityRepository} from 'typeorm';
import { LocalWallet } from './local-wallet.entity';

@EntityRepository(LocalWallet)
export class LocalWalletRepository extends Repository<LocalWallet> {}