import { Module } from '@nestjs/common';
import { ProfesoresController } from './profesores.controller';
import { ProfesoresService } from './profesores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesores } from './entity/profesores.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profesores])],
  providers: [ProfesoresService],
  controllers: [ProfesoresController],
  exports: [ProfesoresService],
})
export class ProfesoresModule {}
