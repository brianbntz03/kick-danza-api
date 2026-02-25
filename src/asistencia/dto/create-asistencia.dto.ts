import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';


export enum TipoPago {
  MENSUAL = 'MENSUAL',
  CLASE = 'CLASE',
}
export class CreateAsistenciaDto {
  @IsNumber()
  alumnoId: number;

  @IsNumber()
  claseId: number;

  @IsOptional()
  @IsBoolean()
  pago: boolean;

  @IsOptional()
  @IsEnum(TipoPago)
  tipoPago?: TipoPago;
}
