import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AlumnosService } from './alumnos.service';
import { CreateAlumnosDto } from './dto/create-alumnos.dto';
import { UpdateAlumnoDto } from './dto/update-alumnos.dto';

@Controller('alumnos')
export class AlumnosController {
  constructor(private readonly alumnosService: AlumnosService) {}

  @Get()
  findAll() {
    return this.alumnosService.findAll();
  }

  @Post()
  create(@Body() dto: CreateAlumnosDto) {
    return this.alumnosService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAlumnoDto) {
    return this.alumnosService.update(id, dto);
  }

  @Delete(':id')
  deleteAlumno(@Param('id', ParseIntPipe) id: number) {
    return this.alumnosService.delete(id);
  }
}
