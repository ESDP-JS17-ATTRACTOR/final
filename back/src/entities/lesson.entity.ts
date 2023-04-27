import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from './course.entity';
import { Module } from './module.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @ManyToOne(() => Module)
  @JoinColumn({ name: 'moduleId' })
  module: Module;

  @Column()
  number: number;

  @Column()
  title: string;

  @Column()
  video: string | null;

  @Column()
  description: string;

  @Column({ type: 'boolean', default: 'false' })
  isStopLesson: boolean;
}
