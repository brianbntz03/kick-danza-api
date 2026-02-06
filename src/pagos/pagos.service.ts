import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pagos.dto';
import { Pagos, TipoPago } from './pagos.entity';
import { Alumnos } from 'src/alumnos/alumnos.entity';
import { Actividad } from 'src/actividades/actividad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NombreClase } from 'src/nombre-clase/nombre-clase.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pagos) private pagoRepo: Repository<Pagos>,
    @InjectRepository(Alumnos) private alumnoRepo: Repository<Alumnos>,
    @InjectRepository(Actividad) private actividadRepo: Repository<Actividad>,
    @InjectRepository(NombreClase) private claseRepo: Repository<NombreClase>,
  ) {}

  async crearPago(dto: CreatePagoDto) {
    const alumno = await this.alumnoRepo.findOneBy({ id: dto.alumnoId });
    if (!alumno) throw new NotFoundException('Alumno no existe');

    const pago = this.pagoRepo.create({
      alumno,
      tipos: dto.tipo as TipoPago,
      monto: dto.monto,
      fechaPago: new Date().toISOString().split('T')[0],
    });

    if (dto.tipo === 'MENSUAL') {
      if (dto.mes === undefined || dto.año === undefined || !dto.actividadId) {
        throw new NotFoundException('Datos incompletos para el pago mensual');
      }

      const actividad = await this.actividadRepo.findOneBy({
        id: dto.actividadId,
      });
      if (!actividad) {
        throw new NotFoundException('Actividad no encontrada');
      }

      pago.mes = dto.mes;
      pago.año = dto.año;
      pago.actividad = actividad;
    }

    if (dto.tipo === 'CLASE') {
      if (!dto.claseId) throw new NotFoundException('Clase requerida');

      const clase = await this.claseRepo.findOneBy({ id: dto.claseId });
      if (!clase) throw new NotFoundException('clase no encontrada');

      pago.clases = clase;
    }

    return this.pagoRepo.save(pago);
  }

  getPagos() {
    return this.pagoRepo.find();
  }
}
