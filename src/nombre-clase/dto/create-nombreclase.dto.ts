import { ApiProperty } from '@nestjs/swagger';

export class CreateNombreClaseDto {
  @ApiProperty({})
  nombre: string;

  @ApiProperty({})
  actividad: number;

  @ApiProperty({})
  descripcion: string;

  @ApiProperty({})
  profesorId: number;
}
