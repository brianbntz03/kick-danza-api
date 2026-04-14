import { ApiProperty } from '@nestjs/swagger';

export class CreateNombreClaseDto {
  @ApiProperty({})
  nombre: string;

  @ApiProperty({})
  actividad: number;

  @ApiProperty({})
  profesorId: number;
}
