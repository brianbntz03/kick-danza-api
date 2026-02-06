import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum AlumnosStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Entity()
export class Alumnos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column({
    type: 'varchar',
    default: AlumnosStatus.PENDING,
  })
  status: AlumnosStatus;
}
