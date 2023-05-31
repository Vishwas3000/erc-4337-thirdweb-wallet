import { Test, TestingModule } from '@nestjs/testing';
import { MintEntryController } from './mint-entry.controller';
import { MintEntryService } from './mint-entry.service';

describe('MintEntryController', () => {
  let controller: MintEntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MintEntryController],
      providers: [MintEntryService],
    }).compile();

    controller = module.get<MintEntryController>(MintEntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
