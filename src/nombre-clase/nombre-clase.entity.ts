import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class NombreClase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
}
