import { Module } from '@nestjs/common';
import { EventoCulturalService } from './evento-cultural.service.js';
import { EventoCulturalController } from './evento-cultural.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventoCultural } from './entities/evento-cultural.entity.js';
import { Recinto } from '../recintos/entities/recinto.entity.js';

@Module({

  imports: [TypeOrmModule.forFeature([EventoCultural, Recinto])],
  controllers: [EventoCulturalController],
  providers: [EventoCulturalService],
})
export class EventoCulturalModule {}
