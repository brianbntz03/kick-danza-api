import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pagos.dto';
import { Pagos, TipoPago } from './entity/pagos.entity';
import { Alumnos } from 'src/alumnos/entity/alumnos.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NombreClase } from 'src/nombre-clase/entity/nombre-clase.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pagos)
    private pagoRepo: Repository<Pagos>,

    @InjectRepository(Alumnos)
    private alumnoRepo: Repository<Alumnos>,

    @InjectRepository(NombreClase)
    private claseRepo: Repository<NombreClase>,
  ) {}

  async crearPago(dto: CreatePagoDto) {
    const alumno = await this.alumnoRepo.findOneBy({
      id: dto.alumnoId,
    });

    if (!alumno) {
      throw new NotFoundException('Alumno no existe');
    }

    const fecha = dto.fechaPago ? new Date(dto.fechaPago) : new Date();
    const mes = fecha.getMonth();
    const anio = fecha.getFullYear();

    if (dto.tipo === TipoPago.MENSUAL) {
      const pagosMensuales = await this.pagoRepo.find({
        where: {
          alumno: { id: dto.alumnoId },
          tipo: TipoPago.MENSUAL,
        },
      });

      const yaPago = pagosMensuales.some((p) => {
        const f = new Date(p.fechaPago);
        return f.getMonth() === mes && f.getFullYear() === anio;
      });

      if (yaPago) {
        throw new BadRequestException(
          'El alumno ya pagó la mensualidad este mes',
        );
      }

      const pago = this.pagoRepo.create({
        alumno,
        tipo: TipoPago.MENSUAL,
        fechaPago: fecha,
      });

      return await this.pagoRepo.save(pago);
    }

    // 🔹 Validación CLASE
    if (dto.tipo === TipoPago.CLASE) {
      if (!dto.claseId) {
        throw new BadRequestException('Clase requerida');
      }

      const clase = await this.claseRepo.findOneBy({
        id: dto.claseId,
      });

      if (!clase) {
        throw new NotFoundException('Clase no encontrada');
      }

      const pagoExistente = await this.pagoRepo.findOne({
        where: {
          alumno: { id: dto.alumnoId },
          clase: { id: dto.claseId },
          tipo: TipoPago.CLASE,
          fechaPago: fecha,
        },
      });

      if (pagoExistente) {
        throw new BadRequestException(
          'El alumno ya pagó esa clase en esa fecha',
        );
      }

      const pago = this.pagoRepo.create({
        alumno,
        clase,
        tipo: TipoPago.CLASE,
        fechaPago: fecha,
      });

      return await this.pagoRepo.save(pago);
    }

    throw new BadRequestException('Tipo de pago inválido');
  }

  async getPagos() {
    return this.pagoRepo.find({
      relations: {
        alumno: true,
        clase: true,
      },
    });
  }
}
