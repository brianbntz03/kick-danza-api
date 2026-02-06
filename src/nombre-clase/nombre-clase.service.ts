import { Injectable } from '@nestjs/common';

@Injectable()
export class NombreClaseService {
  private nombreclase = [
    { 
      id: 1, 
      nombre: 'White Tiger', 
      actividad: 'Kickboxing',
      profesorId: 1,
      nivel: 'Principiante',
      duracion: 60,
      descripcion: 'Clase de kickboxing para principiantes'
    },
    { 
      id: 2, 
      nombre: 'Ballet Clásico', 
      actividad: 'Danza Clásica',
      profesorId: 2,
      nivel: 'Intermedio',
      duracion: 90,
      descripcion: 'Clase de ballet clásico nivel intermedio'
    }
  ];

  findAll() {
    return this.nombreclase;
  }

  create(dto: any) {
    const nombreclase = {
      id: this.nombreclase.length + 1,
      ...dto
    };
    this.nombreclase.push(nombreclase);
    return nombreclase;
  }

  update(id: number, dto: any) {
    const nombreclase = this.nombreclase.find(a => a.id === id);
    if (!nombreclase) return null;
    
    Object.assign(nombreclase, dto);
    return nombreclase;
  }

  remove(id: number) {
    const index = this.nombreclase.findIndex(a => a.id === id);
    if (index === -1) return;

    this.nombreclase.splice(index, 1);
  }
}
