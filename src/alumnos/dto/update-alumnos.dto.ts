import { PartialType } from '@nestjs/swagger';
import { CreateAlumnosDto } from './create-alumnos.dto';

export class UpdateAlumnoDto extends PartialType(CreateAlumnosDto) {}