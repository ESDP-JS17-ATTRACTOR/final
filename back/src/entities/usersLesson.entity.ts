import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lesson } from './lesson.entity';
import { User } from './user.entity';

@Entity()
export class UsersLesson {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  student: User;

  @ManyToOne(() => Lesson)
  @JoinColumn({ name: 'lessonId' })
  lesson: Lesson;

  @Column({
    default: 'not done',
    enum: ['not done', 'done'],
  })
  status: string;

  @Column({ type: 'boolean', default: false })
  viewed: boolean;

  @Column({ type: 'boolean', default: false })
  available: boolean;
}
