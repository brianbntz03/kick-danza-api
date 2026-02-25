import { Module } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { PagosController } from './pagos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pagos } from './pagos.entity';
import { AlumnosModule } from 'src/alumnos/alumnos.module';
import { ActividadesModule } from 'src/actividades/actividades.module';
import { NombreClaseModule } from 'src/nombre-clase/nombre-clase.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pagos]),
    AlumnosModule,
    ActividadesModule,
    NombreClaseModule,
  ],
  providers: [PagosService],
  controllers: [PagosController],
})
export class PagosModule {}
