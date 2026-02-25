import { Alumnos } from 'src/alumnos/entity/alumnos.entity';
import { NombreClase } from 'src/nombre-clase/entity/nombre-clase.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Actividad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deporte: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ default: true })
  activa: boolean;

  @OneToMany(() => NombreClase, (NombreClase) => NombreClase.actividad)
  nombreClases: NombreClase[];

  @OneToMany(() => Alumnos, (alumno) => alumno.actividad)
  alumnos: Alumnos[];
}
