import { Profesores } from 'src/profesores/profesores.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Actividad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deporte: string;

  @Column()
  dias: string;

  @Column()
  horario: string;

  @Column('decimal')
  precioMensual: number;

  @Column({ default: true })
  activa: boolean;

  @ManyToOne(() => Profesores, (profesores) => profesores.actividades, {
    eager: true,
  })
  profesores: Profesores;
}
