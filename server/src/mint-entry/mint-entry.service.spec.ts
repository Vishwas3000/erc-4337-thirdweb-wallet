import { Test, TestingModule } from '@nestjs/testing';
import { MintEntryService } from './mint-entry.service';

describe('MintEntryService', () => {
  let service: MintEntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MintEntryService],
    }).compile();

    service = module.get<MintEntryService>(MintEntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
