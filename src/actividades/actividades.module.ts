import { Module } from '@nestjs/common';
import { ActividadesController } from './actividades.controller';
import { ActividadesService } from './actividades.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actividad } from './entity/actividad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Actividad])],
  providers: [ActividadesService],
  controllers: [ActividadesController],
  exports: [TypeOrmModule],
})
export class ActividadesModule {}
