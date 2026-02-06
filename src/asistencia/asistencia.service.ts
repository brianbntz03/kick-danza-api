import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { Asistencia } from './asistencia.entity';
import { Alumnos } from 'src/alumnos/alumnos.entity';
import { NombreClase } from 'src/nombre-clase/nombre-clase.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AsistenciaService {
  constructor(
    @InjectRepository(Asistencia)
    private asistenciaRepo: Repository<Asistencia>,

    @InjectRepository(Alumnos)
    private alumnoRepo: Repository<Alumnos>,

    @InjectRepository(NombreClase)
    private claseRepo: Repository<NombreClase>,
  ) {}

  async registrar(dto: CreateAsistenciaDto) {
    const alumno = await this.alumnoRepo.findOneBy({ id: dto.alumnoId });
    if(!alumno) throw new NotFoundException('Alumno no encontrado');

    const nombreClase = await this.claseRepo.findOneBy({ id: dto.claseId });
    if(!nombreClase) throw new NotFoundException('clase no encontrada');

    const hoy = new Date().toISOString().split('T')[0];

    const yaRegistrado = await this.asistenciaRepo.findOne({
      where: {
        alumno: { id: alumno.id },
        nombreClase: { id: nombreClase.id },
        fecha: hoy,
      },
    });

    if(yaRegistrado){
      return yaRegistrado;
    }


    const asistencia = this.asistenciaRepo.create({
      alumno,
      nombreClase,
      fecha: hoy,
      presente: true,
      pagoRegistrado: dto.pago ?? false,
    });

    return this.asistenciaRepo.save(asistencia);
  }

  getAll() {
    return this.asistenciaRepo.find();
  }

  getPorClase(claseId: number){
  return this.asistenciaRepo.find({
      where: {
        nombreClase: { id: claseId },
      },
    });
  }

  async marcarPago(id: number) {
    const asistencia = await this.asistenciaRepo.findOneBy({ id });
    if(!asistencia) throw new NotFoundException('Asistencia no encontrada');

    asistencia.pagoRegistrado = true;
    return this.asistenciaRepo.save(asistencia);
  }
}
