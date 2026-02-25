import { Actividad } from 'src/actividades/entity/actividad.entity';
import { NombreClase } from 'src/nombre-clase/entity/nombre-clase.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('alumnos')
export class Alumnos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true, nullable: true })
  dni: string;

  @Column({ nullable: true })
  telefono: string;

  @ManyToOne(() => NombreClase, (clase) => clase.alumnos, { nullable: true })
  @JoinColumn({ name: 'nombreclase_id' })
  nombreclase: NombreClase;

  @ManyToOne(() => Actividad, (actividad) => actividad.alumnos, {
    onDelete: 'CASCADE',
  })
  actividad: Actividad;

  @Column({ type: 'date', nullable: true })
  fechaNacimiento: Date;

  @Column({ type: 'date', nullable: true })
  fechaInscripcion: Date;
}
