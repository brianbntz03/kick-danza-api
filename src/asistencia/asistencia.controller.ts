import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';

@Controller('asistencia')
export class AsistenciaController {
  constructor(private asistenciaService: AsistenciaService) {}

  @Post()
  registrarAsistencia(@Body() dto: CreateAsistenciaDto) {
    return this.asistenciaService.registrar(dto);
  }

  @Get()
  getAsistencia() {
    return this.asistenciaService.getAll();
  }

  @Get('clase/:claseId')
  getPorClase(@Param('claseId') claseId: number) {
    return this.asistenciaService.getPorClase(+claseId);
  }

  @Patch(':id/pago')
  marcarPago(@Param('id') id: number) {
    return this.asistenciaService.marcarPago(+id);
  }
}
