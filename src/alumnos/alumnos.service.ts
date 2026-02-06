import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alumnos, AlumnosStatus } from './alumnos.entity';

@Injectable()
export class AlumnosService {
  constructor(
    @InjectRepository(Alumnos)
    private alumnosRepository: Repository<Alumnos>,
  ) {}

  async getAllAlumnos(): Promise<Alumnos[]> {
    return this.alumnosRepository.find();
  }

  async createAlumnos(nombre: string, descripcion: string): Promise<Alumnos> {
    const alumno = this.alumnosRepository.create({
      nombre,
      descripcion,
      status: AlumnosStatus.PENDING,
    });
    return this.alumnosRepository.save(alumno);
  }

  async updateAlumnos(id: string, nombre: string, descripcion: string): Promise<Alumnos | null> {
    const numericId = parseInt(id);
    await this.alumnosRepository.update(numericId, { nombre, descripcion });
    return this.alumnosRepository.findOne({ where: { id: numericId } });
  }

  async deleteAlumnos(id: string): Promise<void> {
    const numericId = parseInt(id);
    await this.alumnosRepository.delete(numericId);
  }
}
