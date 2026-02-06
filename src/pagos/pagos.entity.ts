import { Actividad } from 'src/actividades/actividad.entity';
import { Alumnos } from 'src/alumnos/alumnos.entity';
import { NombreClase } from 'src/nombre-clase/nombre-clase.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum TipoPago {
  MENSUAL = 'MENSUAL',
  CLASE = 'CLASE',
}

@Entity()
export class Pagos {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Alumnos, { eager: true })
  alumno: Alumnos;

  @Column({
    type: 'enum',
    enum: TipoPago,
  })
  tipos: TipoPago;

  @Column('decimal')
  monto: number;

  @Column({ type: 'date' })
  fechaPago: string;

  @Column({ nullable: true })
  mes?: number;

  @Column({ nullable: true })
  año?: number;

  @ManyToOne(() => Actividad, { nullable: true, eager: true })
  actividad?: Actividad;

  @ManyToOne(() => NombreClase, { nullable: true, eager: true })
  clases?: NombreClase;
}
