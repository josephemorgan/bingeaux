import { Test, TestingModule } from '@nestjs/testing';
import { BingoGameService } from './bingo-game.service';

describe('BingoGameService', () => {
  let service: BingoGameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BingoGameService],
    }).compile();

    service = module.get<BingoGameService>(BingoGameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
