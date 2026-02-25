import { PartialType } from '@nestjs/swagger';
import { CreateNombreClaseDto } from './create-nombreclase.dto';

export class UpdateNombreClaseDto extends PartialType(CreateNombreClaseDto) {}
