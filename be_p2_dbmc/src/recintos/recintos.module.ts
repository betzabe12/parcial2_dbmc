import { Module } from '@nestjs/common';
import { RecintosService } from './recintos.service.js';
import { RecintosController } from './recintos.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recinto } from './entities/recinto.entity.js';

@Module({
  imports: [
    // --- ESTO ES LO QUE FALTA: Registra la entidad Recinto ---
    TypeOrmModule.forFeature([Recinto]),
  ],
  controllers: [RecintosController],
  providers: [RecintosService],
  exports: [TypeOrmModule, RecintosService],
})
export class RecintosModule { }
