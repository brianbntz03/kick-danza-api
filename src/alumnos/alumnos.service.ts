import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alumnos } from './entity/alumnos.entity';
import { CreateAlumnosDto } from './dto/create-alumnos.dto';
import { UpdateAlumnoDto } from './dto/update-alumnos.dto';

@Injectable()
export class AlumnosService {
  constructor(
    @InjectRepository(Alumnos)
    private alumnosRepository: Repository<Alumnos>,
  ) {}

  async findAll(): Promise<Alumnos[]> {
    return this.alumnosRepository.find();
  }

  async create(dto: CreateAlumnosDto): Promise<Alumnos> {
    const alumno = this.alumnosRepository.create({
      nombre: dto.nombre,
      dni: dto.dni,
      telefono: dto.telefono,
      fechaNacimiento: dto.fechaNacimiento,
      fechaInscripcion: dto.fechaInscripcion,
    });
    return this.alumnosRepository.save(alumno);
  }

  async update(id: number, dto: UpdateAlumnoDto): Promise<Alumnos | null> {
    await this.alumnosRepository.update(id, {
      nombre: dto.nombre,
      dni: dto.dni,
      telefono: dto.telefono,
      fechaNacimiento: dto.fechaNacimiento,
      fechaInscripcion: dto.fechaInscripcion,
    });
    return this.alumnosRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    const result = await this.alumnosRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('clase no encontrada');
    }
  }
}
