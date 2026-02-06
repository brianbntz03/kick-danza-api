import { Actividad } from 'src/actividades/actividad.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profesores {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  especialidad: string;

  @Column({ default: true })
  activo: boolean;

  @OneToMany(() => Actividad, (Actividad) => Actividad.profesores)
  actividades: [];
}
