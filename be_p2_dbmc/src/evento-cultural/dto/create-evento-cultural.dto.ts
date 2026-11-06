import { ApiProperty } from '@nestjs/swagger';
import { EstadoEvento, ModalidadIngreso } from '../entities/evento-cultural.entity.js';
import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, Min } from 'class-validator';

export class CreateEventoCulturalDto {
    @ApiProperty({ description: 'ID del recinto donde se realizará el evento', example: 1 })
    @IsInt({ message: 'El id_recinto debe ser un número entero' })
    @IsNotEmpty({ message: 'El id_recinto es obligatorio' })
    id_recinto: number;

    @ApiProperty({ description: 'Título del evento cultural (máximo 150 caracteres)', example: 'Concierto de Gala' })
    @IsString({ message: 'El título debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El título es obligatorio' })
    @MaxLength(150, { message: 'El título no puede superar los 150 caracteres' })
    titulo: string;

    @ApiProperty({ description: 'Artista principal del evento (máximo 100 caracteres)', example: 'Orquesta Sinfónica de Sucre' })
    @IsString({ message: 'El artista principal debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El artista principal es obligatorio' })
    @MaxLength(100, { message: 'El artista principal no puede superar los 100 caracteres' })
    artista_principal: string;

    @ApiProperty({ description: 'Duración del evento en minutos', example: 120 })
    @IsInt({ message: 'La duración en minutos debe ser un número entero' })
    @Min(1, { message: 'La duración debe ser mayor a 0 minutos' })
    @IsNotEmpty({ message: 'La duración en minutos es obligatoria' })
    duracion_minutos: number;

    @ApiProperty({ description: 'Precio de la entrada del evento', example: 50.00 })
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El precio de entrada debe ser un número válido' })
    @IsPositive({ message: 'El precio de entrada debe ser un valor positivo' })
    @IsNotEmpty({ message: 'El precio de entrada es obligatorio' })
    precio_entrada: number;

    @ApiProperty({ description: 'Fecha del evento en formato YYYY-MM-DD', example: '2026-11-20' })
    @IsDateString({}, { message: 'La fecha del evento debe tener un formato válido (YYYY-MM-DD)' })
    @IsNotEmpty({ message: 'La fecha del evento es obligatoria' })
    fecha_evento: string;

    @ApiProperty({
        description: 'Estado del evento',
        enum: EstadoEvento,
        example: EstadoEvento.PROGRAMADO
    })
    @IsEnum(EstadoEvento, { message: 'El estado debe ser: Programado, Agotado o Cancelado' })
    @IsNotEmpty({ message: 'El estado es obligatorio' })
    estado: EstadoEvento;

    @ApiProperty({
        description: 'Modalidad de ingreso al evento',
        enum: ModalidadIngreso,
        example: ModalidadIngreso.GRATUITA
    })
    @IsEnum(ModalidadIngreso, { message: 'La modalidad de ingreso debe ser: entrada pagada, entrada gratuita o pase Invitacion' })
    @IsNotEmpty({ message: 'La modalidad de ingreso es obligatoria' })
    modalidad_ingreso: ModalidadIngreso;
}