import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pagos.dto';
import { Pagos, TipoPago } from './pagos.entity';
import { Alumnos } from 'src/alumnos/entity/alumnos.entity';
import { Actividad } from 'src/actividades/entity/actividad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NombreClase } from 'src/nombre-clase/entity/nombre-clase.entity';
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
    const alumnoId = await this.alumnoRepo.findOneBy({ id: dto.alumnoId });
    if (!alumnoId) throw new NotFoundException('Alumno no existe');

    const pago = this.pagoRepo.create({
      alumnoId,
      tipo: dto.tipo as TipoPago,
      monto: dto.monto,
    });

    if (dto.tipo === TipoPago.MENSUAL) {
      if (dto.mes || dto.año || !dto.actividadId) {
        throw new NotFoundException('Datos incompletos para el pago mensual');
      }

      const actividad = await this.actividadRepo.findOneBy({
        id: dto.actividadId,
      });

      if (!actividad) throw new NotFoundException('Actividad no encontrada');

      pago.mes = dto.mes;
      pago.año = dto.año;
      pago.actividadId = actividad;
    }

    if (dto.tipo === TipoPago.CLASE) {
      if (!dto.claseId) throw new NotFoundException('Clase requerida');

      const clase = await this.claseRepo.findOneBy({ id: dto.claseId });
      if (!clase) throw new NotFoundException('clase no encontrada');

      pago.clase = clase;
    }

    return this.pagoRepo.save(pago);
  }

  async getPagos() {
    return this.pagoRepo.find();
  }
}
