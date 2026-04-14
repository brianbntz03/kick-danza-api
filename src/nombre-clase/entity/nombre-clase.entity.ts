import { Actividad } from 'src/actividades/entity/actividad.entity';
import { Alumnos } from 'src/alumnos/entity/alumnos.entity';
import { Profesores } from 'src/profesores/entity/profesores.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class NombreClase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Actividad, (actividad) => actividad.nombreClases, {
    onDelete: 'CASCADE',
  })
  actividad: Actividad;

  @ManyToOne(() => Profesores)
  @JoinColumn({ name: 'profesorId' })
  profesor: Profesores;

  @OneToMany(() => Alumnos, (alumno) => alumno.nombreclase)
  alumnos: Alumnos[];
}
