import { PartialType } from '@nestjs/mapped-types';
import { CreateRecintoDto } from './create-recinto.dto.js';

export class UpdateRecintoDto extends PartialType(CreateRecintoDto) {}
