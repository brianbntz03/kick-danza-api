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
  alumno: Alumnos;

  @Column({
    type: 'enum',
    enum: TipoPago,
  })
  tipo: TipoPago;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fechaPago: Date;

  @ManyToOne(() => NombreClase, {
    eager: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  clase?: NombreClase;
}
