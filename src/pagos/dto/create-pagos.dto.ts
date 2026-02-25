import { ApiProperty } from '@nestjs/swagger';

export class CreatePagoDto {
  @ApiProperty()
  alumnoId: number;

  @ApiProperty()
  tipo: 'MENSUAL' | 'CLASE';

  @ApiProperty()
  monto: number;

  @ApiProperty()
  fecha: Date;

  @ApiProperty()
  mes: number;

  @ApiProperty()
  año: number;

  @ApiProperty()
  actividadId: number;

  @ApiProperty()
  claseId: number;
}
