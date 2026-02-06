import { IsString, MinLength } from 'class-validator';

export class CreateAlumnosDto {
  @IsString()
  @MinLength(1)
  nombre: string;

  @IsString()
  @MinLength(1)
  descripcion: string;
}
