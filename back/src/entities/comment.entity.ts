import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Lesson } from './lesson.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  author: User;

  @ManyToOne(() => Lesson)
  @JoinColumn({ name: 'lessonId' })
  lesson: Lesson;

  @Column()
  text: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;
}
