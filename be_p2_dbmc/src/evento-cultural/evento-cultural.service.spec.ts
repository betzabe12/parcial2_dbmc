import { Test, TestingModule } from '@nestjs/testing';
import { EventoCulturalService } from './evento-cultural.service.js';

describe('EventoCulturalService', () => {
  let service: EventoCulturalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventoCulturalService],
    }).compile();

    service = module.get<EventoCulturalService>(EventoCulturalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
