import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecintoDto } from './dto/create-recinto.dto.js';
import { UpdateRecintoDto } from './dto/update-recinto.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Recinto } from './entities/recinto.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class RecintosService {
  constructor(
    @InjectRepository(Recinto)
    private readonly recintoRepository: Repository<Recinto>
  ){}


  async create(createRecintoDto: CreateRecintoDto): Promise<Recinto> {
    const recintoExistente = await this.recintoRepository.findOneBy({
      nombre: createRecintoDto.nombre,
    });
    if(!recintoExistente){
      throw new NotFoundException('ya existe un recinto registrado con ese nombre ');
    }
    
    const recinto = this.recintoRepository.create(createRecintoDto)
    return await this.recintoRepository.save(recinto);
  }

  async findAll(): Promise<Recinto[]> {
    return await this.recintoRepository.find();
  }

  async findOne(id: number): Promise<Recinto> {
    const recinto = await this.recintoRepository.findOneBy({ id });
    if(!recinto)
    {
      throw new NotFoundException(`El recinto con ID ${id} no existe`);
    }
    return recinto;
  }

  
  async update(id: number, updateRecintoDto: UpdateRecintoDto): Promise<Recinto> {
    const recinto = await this.findOne(id);

    if(updateRecintoDto.nombre && updateRecintoDto.nombre !== recinto.nombre){
      const recintoExistente = await this.recintoRepository.findOneBy({
        nombre: updateRecintoDto.nombre,
      });
      if(recintoExistente){
        throw new ConflictException('Ya existe otro recinto registrado con ese nombre');
      }
    }
    Object.assign(recinto, updateRecintoDto);
    return await this.recintoRepository.save(recinto);
  }

  async remove(id: number): Promise<Recinto> {
    const recinto = await this.findOne(id);
    return await this.recintoRepository.remove(recinto);
  }
}
