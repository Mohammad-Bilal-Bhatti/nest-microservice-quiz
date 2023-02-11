import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IFlim } from '../interfaces/flim';

@Entity()
export class Flim implements IFlim {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  director: string;

  @Column()
  release_year: number;

  @Column('simple-array')
  actors: string[];
}