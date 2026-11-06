import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  JoinColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  DeleteDateColumn 
} from 'typeorm';
import { Recinto } from '../../recintos/entities/recinto.entity.js';

export enum EstadoEvento {
  PROGRAMADO = 'Programado',
  AGOTADO = 'Agotado',
  CANCELADO = 'Cancelado',
}

export enum ModalidadIngreso {
  PAGADA = 'entrada pagada',
  GRATUITA = 'entrada gratuita',
  INVITACION = 'pase Invitacion',
}

@Entity('eventos_culturales')
export class EventoCultural {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  id_recinto: number;

  @Column({ type: 'varchar', length: 150 })
  titulo: string;

  @Column({ type: 'varchar', length: 100 })
  artista_principal: string;

  @Column({ type: 'int' })
  duracion_minutos: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_entrada: number;

  @Column({ type: 'date' })
  fecha_evento: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: EstadoEvento.PROGRAMADO,
  })
  estado: EstadoEvento;

  @Column({
    type: 'enum',
    enum: ModalidadIngreso,
    default: ModalidadIngreso.GRATUITA,
  })
  modalidad_ingreso: ModalidadIngreso;

  @ManyToOne(() => Recinto, { onDelete: 'RESTRICT', eager: true })
  @JoinColumn({ name: 'id_recinto' })
  recinto: Recinto;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  fecha_modificacion: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  fecha_eliminacion: Date;
}