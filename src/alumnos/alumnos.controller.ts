import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { AlumnosService } from './alumnos.service';

@ApiTags('alumnos')
@Controller('alumnos')
export class AlumnosController {
  constructor(private alumnosService: AlumnosService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los alumnos' })
  getAllAlumnos() {
    return this.alumnosService.getAllAlumnos();
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo alumno' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nombre: { type: 'string', example: 'Juan Pérez' },
        descripcion: { type: 'string', example: 'Estudiante de danza' }
      },
      required: ['nombre', 'descripcion']
    }
  })
  createAlumno(@Body() body: { nombre: string; descripcion: string }) {
    console.log('POST /alumnos - Body:', body);
    
    if (!body || !body.nombre || !body.descripcion) {
      throw new Error('Nombre y descripción son requeridos');
    }
    
    return this.alumnosService.createAlumnos(body.nombre, body.descripcion);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un alumno' })
  deleteAlumno(@Param('id') id: string) {
    return this.alumnosService.deleteAlumnos(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un alumno' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nombre: { type: 'string', example: 'Juan Pérez' },
        descripcion: { type: 'string', example: 'Estudiante de danza' }
      }
    }
  })
  updateAlumno(
    @Param('id') id: string,
    @Body() body: { nombre?: string; descripcion?: string },
  ) {
    return this.alumnosService.updateAlumnos(
      id,
      body.nombre || '',
      body.descripcion || '',
    );
  }
}
