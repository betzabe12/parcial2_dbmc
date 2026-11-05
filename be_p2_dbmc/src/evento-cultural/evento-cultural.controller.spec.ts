import { Test, TestingModule } from '@nestjs/testing';
import { EventoCulturalController } from './evento-cultural.controller.js';
import { EventoCulturalService } from './evento-cultural.service.js';

describe('EventoCulturalController', () => {
  let controller: EventoCulturalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventoCulturalController],
      providers: [EventoCulturalService],
    }).compile();

    controller = module.get<EventoCulturalController>(EventoCulturalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
