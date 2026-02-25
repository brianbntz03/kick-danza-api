import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlumnosController } from './alumnos.controller';
import { AlumnosService } from './alumnos.service';
import { Alumnos } from './entity/alumnos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alumnos])],
  exports: [TypeOrmModule],
  controllers: [AlumnosController],
  providers: [AlumnosService],
})
export class AlumnosModule {}
