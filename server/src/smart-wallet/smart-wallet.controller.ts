import { Controller } from '@nestjs/common';
import { SmartWalletService } from './smart-wallet.service';

@Controller('smart-wallet')
export class SmartWalletController {
  constructor(private readonly smartWalletService: SmartWalletService) {}
}
