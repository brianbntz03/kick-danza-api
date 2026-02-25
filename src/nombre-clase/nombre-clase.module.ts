import { Module } from '@nestjs/common';
import { NombreClaseController } from './nombre-clase.controller';
import { NombreClaseService } from './nombre-clase.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NombreClase } from './entity/nombre-clase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NombreClase])],
  exports: [TypeOrmModule],
  controllers: [NombreClaseController],
  providers: [NombreClaseService],
})
export class NombreClaseModule {}
