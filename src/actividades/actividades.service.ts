import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actividad } from './entity/actividad.entity';
import { Repository } from 'typeorm';
import { createActividadDto } from './dto/create-actividad.dto';
import { UpdateActividadDto } from './dto/update-actividad.to';

@Injectable()
export class ActividadesService {
  constructor(
    @InjectRepository(Actividad)
    private actividadesRepository: Repository<Actividad>,
  ) {}

  async findAll(): Promise<Actividad[]> {
    return this.actividadesRepository.find();
  }

  async create(createdto: createActividadDto): Promise<Actividad> {
    const actividadNueva = this.actividadesRepository.create({
      deporte: createdto.deporte,
      descripcion: createdto.descripcion,
    });

    return await this.actividadesRepository.save(actividadNueva);
  }

  async update(id: number, updatedto: UpdateActividadDto): Promise<Actividad> {
    const actividad = await this.actividadesRepository.findOne({
      where: { id },
    });

    if (!actividad) {
      throw new NotFoundException('clase no encontrada');
    }

    Object.assign(actividad, updatedto);
    return this.actividadesRepository.save(actividad);
  }

  async remove(id: number): Promise<void> {
    const result = await this.actividadesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('clase no encontrada');
    }
  }
}
