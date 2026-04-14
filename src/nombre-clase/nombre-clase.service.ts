import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { NombreClase } from './entity/nombre-clase.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNombreClaseDto } from './dto/create-nombreclase.dto';
import { UpdateNombreClaseDto } from './dto/update-nombreclase.dto';

@Injectable()
export class NombreClaseService {
  constructor(
    @InjectRepository(NombreClase)
    private nombreClaseRepository: Repository<NombreClase>,
  ) {}

  async findAll(): Promise<NombreClase[]> {
    return this.nombreClaseRepository.find({
      relations: ['actividad', 'profesor'],
    });
  }

  async create(createDto: CreateNombreClaseDto): Promise<NombreClase> {
    console.log(createDto);

    const nuevaClase = this.nombreClaseRepository.create({
      nombre: createDto.nombre,
      actividad: { id: createDto.actividad } as any,
      profesor: { id: createDto.profesorId } as any,
    });

    return this.nombreClaseRepository.save(nuevaClase);
  }

  async update(
    id: number,
    updatedto: UpdateNombreClaseDto,
  ): Promise<NombreClase> {
    const clase = await this.nombreClaseRepository.findOne({
      where: { id },
      relations: ['actividad', 'profesor'],
    });

    if (!clase) {
      throw new NotFoundException('clase no encontrada');
    }

    if (updatedto.profesorId) {
      clase.profesor = { id: updatedto.profesorId } as any;
    }

    if (updatedto.actividad) {
      clase.actividad = { id: updatedto.actividad } as any;
    }

    if (updatedto.nombre !== undefined) {
      clase.nombre = updatedto.nombre;
    }

    return this.nombreClaseRepository.save(clase);
  }

  async remove(id: number): Promise<void> {
    const result = await this.nombreClaseRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('clase no encontrada');
    }
  }
}
