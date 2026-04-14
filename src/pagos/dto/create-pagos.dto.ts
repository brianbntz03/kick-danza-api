import { ApiProperty } from '@nestjs/swagger';
import { TipoPago } from '../entity/pagos.entity';
import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class CreatePagoDto {
  @ApiProperty()
  @IsNumber()
  alumnoId: number;

  @ApiProperty({ required: false})
  @IsOptional()
  @IsNumber()
  claseId: number;

  @ApiProperty({ enum: TipoPago })
  @IsEnum(TipoPago)
  tipo: TipoPago;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  fechaPago?: Date;
}
