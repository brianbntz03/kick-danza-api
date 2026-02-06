import { IsNumber, IsString } from 'class-validator';

export class createActividadDto {
  @IsString()
  nombre: string;

  @IsString()
  deporte: string;

  @IsString()
  dias: string;

  @IsString()
  horarios: string;

  @IsNumber()
  precioMensual: number;

  @IsNumber()
  profesorId: number;
}
