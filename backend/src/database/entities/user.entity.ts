import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany, Unique } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;
}