import { IsOptional, IsString, MinLength } from 'class-validator';

export class updateAlumnoDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  nombre?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  descripcion?: string;
}
