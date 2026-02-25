import { Module } from '@nestjs/common';
import { AsistenciaController } from './asistencia.controller';
import { AsistenciaService } from './asistencia.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alumnos } from 'src/alumnos/entity/alumnos.entity';
import { NombreClase } from 'src/nombre-clase/entity/nombre-clase.entity';
import { Asistencia } from './asistencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asistencia, Alumnos, NombreClase])],
  controllers: [AsistenciaController],
  providers: [AsistenciaService],
})
export class AsistenciaModule {}
