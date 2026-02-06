import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { NombreClaseService } from './nombre-clase.service';
import { CreateNombreClaseDto } from './dto/create-nombreclase.dto';
import { UpdateNombreClaseDto } from './dto/update-nombreclase.dto';

@ApiTags('nombre-clase')
@Controller('nombre-clase')
export class NombreClaseController {
  constructor(private readonly nombreClaseService: NombreClaseService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las clases' })
  findAll() {
    return this.nombreClaseService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva clase' })
  create(@Body() dto: CreateNombreClaseDto) {
    return this.nombreClaseService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una clase' })
  update(@Param('id') id: string, @Body() dto: UpdateNombreClaseDto) {
    return this.nombreClaseService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una clase' })
  remove(@Param('id') id: string) {
    return this.nombreClaseService.remove(+id);
  }
}
