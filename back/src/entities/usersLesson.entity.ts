import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column({ type: 'boolean', default: false })
  isViewed: boolean;

  @Column({ type: 'boolean', default: false })
  isAvailable: boolean;

  @Column({ type: 'timestamp', nullable: true })
  viewedAt: Date;
}
