import { IsInt, IsOptional, IsString, MaxLength } from "class-validator";


export class CreateRecintoDto {

    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres' })
    nombre: string;

    @IsString({ message: 'La ciudad debe ser una cadena de texto' })
    @MaxLength(50, { message: 'La ciudad no puede superar los 50 caracteres' })
    ciudad: string;

    @IsOptional()
    @IsInt({ message: 'El aforo máximo debe ser un número entero' })
    aforo_maximo?: number;
}
