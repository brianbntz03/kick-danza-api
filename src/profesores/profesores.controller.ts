import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { updateAlumnoDto } from 'src/alumnos/dto/update-alumnos.dto';
import { ProfesoresService } from './profesores.service';

@Controller('profesores')
export class ProfesoresController {
  constructor(private readonly profesoresService: ProfesoresService) {}

  @Get()
  findAll() {
    return this.profesoresService.findAll();
  }

  @Post()
  create(@Body() dto: CreateProfesorDto) {
    return this.profesoresService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: updateAlumnoDto) {
    return this.profesoresService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profesoresService.remove(+id);
  }
}
