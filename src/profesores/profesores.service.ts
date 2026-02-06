import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfesoresService {
  private profesores = [
    { id: 1, nombre: 'Ana García', especialidad: 'Ballet Clásico', email: 'ana@danza.com' },
    { id: 2, nombre: 'Carlos López', especialidad: 'Danza Moderna', email: 'carlos@danza.com' }
  ];

  findAll() {
    return this.profesores;
  }

  create(dto: any) {
    const profesor = {
      id: this.profesores.length + 1,
      ...dto
    };
    this.profesores.push(profesor);
    return profesor;
  }

  update(id: number, dto: any) {
    const profesor = this.profesores.find(p => p.id === id);
    if (!profesor) return null;
    
    Object.assign(profesor, dto);
    return profesor;
  }

  remove(id: number) {
    const index = this.profesores.findIndex(p => p.id === id);
    if (index === -1) return;
    
    this.profesores.splice(index, 1);
  }
}
