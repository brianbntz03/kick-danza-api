import { Body, Controller, Get, Post } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { CreatePagoDto } from './dto/create-pagos.dto';

@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post()
  crear(@Body() dto: CreatePagoDto) {
    return this.pagosService.crearPago(dto);
  }

  @Get()
  getAll() {
    return this.pagosService.getPagos();
  }
}
