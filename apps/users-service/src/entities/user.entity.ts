import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../interfaces/user.out';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  location: string;
}