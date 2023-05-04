import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Homework } from './homework.entity';

@Entity()
export class StudentHomework {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Homework)
  @JoinColumn({ name: 'homeworkId' })
  homework: Homework;

  @Column({ type: 'timestamptz' })
  date: Date;

  @Column({ default: 'Done' })
  status: string;

  @Column()
  studentName: string;

  @Column()
  studentEmail: string;

  @Column({ default: 'Not checked', enum: ['Not checked', 'Checked'] })
  isChecked: string;

  @Column('simple-array', { nullable: true })
  studentFiles: string[];
}
