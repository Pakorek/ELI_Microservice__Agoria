import { Authorized, Field, InputType, ObjectType } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Course } from './Course';
import { Tag } from './Tag';

export type ROLE = 'TEACHER' | 'STUDENT';

@ObjectType('User')
@InputType('UserInput')
@Entity()
export class User extends BaseEntity {
  // auto generated for db index
  @PrimaryGeneratedColumn()
  uuid!: number;

  // id from gateway
  @Field()
  @Column()
  id!: number;

  @OneToMany(() => Course, (course) => course.user)
  courses!: Course[];

  @Authorized('TEACHER')
  @ManyToMany(() => Tag)
  @JoinTable({ name: 'teacher_has_specialities' })
  specialities!: Tag[];

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}
