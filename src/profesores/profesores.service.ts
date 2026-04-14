import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profesores } from './entity/profesores.entity';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { Actividad } from 'src/actividades/entity/actividad.entity';
import { NombreClase } from 'src/nombre-clase/entity/nombre-clase.entity';

@Injectable()
export class ProfesoresService {
  constructor(
    @InjectRepository(Profesores)
    private readonly profesoresRepository: Repository<Profesores>,
  ) {}

  async findAll(): Promise<Profesores[]> {
    return this.profesoresRepository.find({
      where: { activo: true },
      relations: ['actividad', 'nombreclase'],
    });
  }

  async create(dto: CreateProfesorDto): Promise<Profesores> {
    const profesor = this.profesoresRepository.create({
      nombre: dto.nombre,
      telefono: dto.telefono,
      email: dto.email,
      activo: true,
    });

    // Relación Actividad
    const actividad = await this.profesoresRepository.manager.findOne(
      Actividad,
      {
        where: { id: dto.actividadId },
      },
    );
    if (!actividad) throw new NotFoundException('Actividad no encontrada');
    profesor.actividad = actividad;

    // Relación NombreClase
    const nombreclase = await this.profesoresRepository.manager.findOne(
      NombreClase,
      {
        where: { id: dto.nombreclaseId },
      },
    );
    if (!nombreclase) throw new NotFoundException('NombreClase no encontrada');
    profesor.nombreclase = nombreclase;

    return this.profesoresRepository.save(profesor);
  }

  async update(id: number, dto: UpdateProfesorDto): Promise<Profesores> {
    const profesor = await this.profesoresRepository.findOne({
      where: { id },
      relations: ['actividad', 'nombreclase'],
    });
    if (!profesor) throw new NotFoundException('Profesor no encontrado');

    if (dto.actividadId) {
      const actividad = await this.profesoresRepository.manager.findOne(
        Actividad,
        {
          where: { id: dto.actividadId },
        },
      );
      if (!actividad) throw new NotFoundException('Actividad no encontrada');
      profesor.actividad = actividad;
    }

    if (dto.nombreclaseId) {
      const nombreclase = await this.profesoresRepository.manager.findOne(
        NombreClase,
        {
          where: { id: dto.nombreclaseId },
        },
      );
      if (!nombreclase)
        throw new NotFoundException('NombreClase no encontrada');
      profesor.nombreclase = nombreclase;
    }

    Object.assign(profesor, {
      nombre: dto.nombre ?? profesor.nombre,
      telefono: dto.telefono ?? profesor.telefono,
      email: dto.email ?? profesor.email,
    });

    return this.profesoresRepository.save(profesor);
  }

  async remove(id: number): Promise<void> {
    const profesor = await this.profesoresRepository.findOne({ where: { id } });
    if (!profesor) throw new NotFoundException('Profesor no encontrado');

    profesor.activo = false;
    await this.profesoresRepository.save(profesor);
  }
}
