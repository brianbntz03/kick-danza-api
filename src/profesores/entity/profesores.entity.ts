import { Actividad } from 'src/actividades/entity/actividad.entity';
import { NombreClase } from 'src/nombre-clase/entity/nombre-clase.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profesores {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ nullable: true })
  dni: string;

  @Column({ default: true })
  activo: boolean;

  @ManyToOne(() => Actividad, { nullable: true })
  @JoinColumn({ name: 'actividadId' })
  actividad?: Actividad;

  @ManyToOne(() => NombreClase, { nullable: true })
  @JoinColumn({ name: 'nombreclaseId' })
  nombreclase?: NombreClase;
}
