import { Alumnos } from 'src/alumnos/entity/alumnos.entity';
import { NombreClase } from 'src/nombre-clase/entity/nombre-clase.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Asistencia {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Alumnos, { eager: true })
  alumno: Alumnos;

  @ManyToOne(() => NombreClase, { eager: true })
  clase: NombreClase;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ default: true })
  presente: boolean;

  @Column({ default: false })
  pagoRegistrado: boolean;
}
