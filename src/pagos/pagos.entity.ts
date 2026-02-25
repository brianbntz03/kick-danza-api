import { Actividad } from 'src/actividades/entity/actividad.entity';
import { Alumnos } from 'src/alumnos/entity/alumnos.entity';
import { NombreClase } from 'src/nombre-clase/entity/nombre-clase.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum TipoPago {
  MENSUAL = 'MENSUAL',
  CLASE = 'CLASE',
}

@Entity()
export class Pagos {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Alumnos, { eager: true, onDelete: 'CASCADE' })
  alumnoId: Alumnos;

  @Column({
    type: 'enum',
    enum: TipoPago,
  })
  tipo: TipoPago;

  @Column({ type: 'decimal' })
  monto: number;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fechaPago: Date;

  @Column({ type: 'int', nullable: true })
  mes: number;

  @Column({ type: 'int', nullable: true })
  año: number;

  @ManyToOne(() => Actividad, { eager: true, nullable: true, onDelete: 'CASCADE' })
  actividadId?: Actividad;

  @ManyToOne(() => NombreClase, {
    eager: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  clase?: NombreClase;
}
