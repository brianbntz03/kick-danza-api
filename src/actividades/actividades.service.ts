import { Injectable } from '@nestjs/common';

@Injectable()
export class ActividadesService {
  private actividades = [
    {
      id: 1,
      nombre: 'Danza Clásica',
      descripcion: 'Ballet clásico',
      profesorId: 1,
    },
    {
      id: 2,
      nombre: 'Danza Moderna',
      descripcion: 'Danza contemporánea',
      profesorId: 2,
    },
  ];

  findAll() {
    return this.actividades;
  }

  create(dto: any) {
    const actividad = {
      id: this.actividades.length + 1,
      ...dto,
    };
    this.actividades.push(actividad);
    return actividad;
  }

  update(id: number, dto: any) {
    const actividad = this.actividades.find((a) => a.id === id);
    if (!actividad) return null;

    Object.assign(actividad, dto);
    return actividad;
  }

  remove(id: number) {
    const index = this.actividades.findIndex((a) => a.id === id);
    if (index === -1) return;

    this.actividades.splice(index, 1);
  }
}
