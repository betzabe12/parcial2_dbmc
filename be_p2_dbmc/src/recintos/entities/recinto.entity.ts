import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EventoCultural } from "../../evento-cultural/entities/evento-cultural.entity.js";

@Entity('recintos')
export class Recinto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    nombre: string

    @Column({ type: 'varchar', length: 100, nullable: false })
    ciudad: string;

    @Column({ type: 'varchar', nullable: false })
    aforo_maximo: number;

    

    @CreateDateColumn({ name: 'fecha_creacion' })
    fechaCreacion: Date;

    @UpdateDateColumn({ name: 'fecha_modificacion' })
    fechaModificacion: Date;

    @DeleteDateColumn({ name: 'fecha_eliminacion' })
    fechaEliminacion: Date;
}
