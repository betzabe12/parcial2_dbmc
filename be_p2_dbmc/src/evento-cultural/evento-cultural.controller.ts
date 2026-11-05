import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventoCulturalService } from './evento-cultural.service.js';
import { CreateEventoCulturalDto } from './dto/create-evento-cultural.dto.js';
import { UpdateEventoCulturalDto } from './dto/update-evento-cultural.dto.js';

@Controller('evento-cultural')
export class EventoCulturalController {
  constructor(private readonly eventoCulturalService: EventoCulturalService) {}

  @Post()
  create(@Body() createEventoCulturalDto: CreateEventoCulturalDto) {
    return this.eventoCulturalService.create(createEventoCulturalDto);
  }

  @Get()
  findAll() {
    return this.eventoCulturalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventoCulturalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventoCulturalDto: UpdateEventoCulturalDto) {
    return this.eventoCulturalService.update(+id, updateEventoCulturalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventoCulturalService.remove(+id);
  }
}
