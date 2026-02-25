import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ActividadesService } from './actividades.service';
import { createActividadDto } from './dto/create-actividad.dto';
import { UpdateActividadDto } from './dto/update-actividad.to';

@Controller('actividades')
export class ActividadesController {
  constructor(private readonly actividadesService: ActividadesService) {}

  @Get()
  findAll() {
    return this.actividadesService.findAll();
  }

  @Post()
  create(@Body() dto: createActividadDto) {
    return this.actividadesService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateActividadDto) {
    return this.actividadesService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actividadesService.remove(+id);
  }
}
