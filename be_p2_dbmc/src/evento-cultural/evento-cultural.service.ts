import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventoCulturalDto } from './dto/create-evento-cultural.dto.js';
import { UpdateEventoCulturalDto } from './dto/update-evento-cultural.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { EventoCultural } from './entities/evento-cultural.entity.js';
import { Repository } from 'typeorm';
import { Recinto } from '../recintos/entities/recinto.entity.js';

@Injectable()
export class EventoCulturalService {
  constructor(
    @InjectRepository(EventoCultural)
    private readonly eventoRepository: Repository<EventoCultural>,
    
    @InjectRepository(Recinto)
    private readonly recintoRepository: Repository<Recinto>,
  ) {}

  // 1. CREAR
  async create(createEventoDto: CreateEventoCulturalDto): Promise<EventoCultural> {
    // Verificar que el recinto al que se quiere asociar realmente exista (Lanza 404 si no existe)
    const recinto = await this.recintoRepository.findOneBy({
      id: createEventoDto.id_recinto,
    });
    if (!recinto) {
      throw new NotFoundException('El recinto especificado no existe');
    }

    const nuevoEvento = this.eventoRepository.create(createEventoDto);
    return await this.eventoRepository.save(nuevoEvento);
  }

  // 2. LISTAR TODOS (Incluye la relación con el recinto y ordenados por fecha)
  async findAll(): Promise<EventoCultural[]> {
    return await this.eventoRepository.find({
      relations: { recinto: true }, // <-- Corregido a objeto para TypeORM moderno
      order: { fecha_evento: 'ASC' },
    });
  }

  // 3. BUSCAR UNO POR ID
  async findOne(id: number): Promise<EventoCultural> {
    const evento = await this.eventoRepository.findOne({
      where: { id },
      relations: { recinto: true }, // <-- Corregido a objeto aquí también
    });
    if (!evento) {
      throw new NotFoundException(`El evento cultural con ID ${id} no existe`);
    }
    return evento;
  }

  // 4. ACTUALIZAR
  async update(id: number, updateEventoDto: UpdateEventoCulturalDto): Promise<EventoCultural> {
    // Verifica que el evento exista (lanza 404 si no)
    const evento = await this.findOne(id);

    // Si se intenta modificar el id_recinto, verificar que el nuevo recinto exista
    if (updateEventoDto.id_recinto) {
      const recinto = await this.recintoRepository.findOneBy({
        id: updateEventoDto.id_recinto,
      });
      if (!recinto) {
        throw new NotFoundException('El recinto especificado no existe');
      }
    }

    Object.assign(evento, updateEventoDto);
    return await this.eventoRepository.save(evento);
  }

  // 5. ELIMINAR
  async remove(id: number): Promise<EventoCultural> {
    const evento = await this.findOne(id);
    return await this.eventoRepository.remove(evento);
  }
}