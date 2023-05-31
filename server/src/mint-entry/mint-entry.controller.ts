import { Controller } from '@nestjs/common';
import { MintEntryService } from './mint-entry.service';

@Controller('mint-entry')
export class MintEntryController {
  constructor(private readonly mintEntryService: MintEntryService) {}
}
