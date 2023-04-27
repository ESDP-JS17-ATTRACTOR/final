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

  // @Column({ default: 'in Process', enum: ['in Process', 'Done'] })
  // status: string;

  @Column()
  description: string;

  @Column()
  tutorName: string;

  // @Column()
  // studentName: string;
  //
  // @Column({ default: 'Not checked', enum: ['Not checked', 'Checked'] })
  // isChecked: string;

  @Column({ type: 'varchar' })
  file: string;
}
