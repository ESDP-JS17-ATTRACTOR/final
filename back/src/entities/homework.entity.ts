import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lesson } from './lesson.entity';

@Entity()
export class Homework {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Lesson)
  @JoinColumn({ name: 'lessonId' })
  lesson: Lesson;

  @Column()
  title: string;

  @Column({ type: 'timestamptz' })
  date: Date;

  @Column()
  description: string;

  @Column()
  tutorName: string;

  @Column()
  tutorEmail: string;

  @Column({ nullable: true })
  pdf: string | null;
}
