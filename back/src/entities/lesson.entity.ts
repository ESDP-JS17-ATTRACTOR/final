import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  courseId: number;

  @Column()
  moduleId: number;

  @Column()
  number: number;

  @Column()
  title: string;

  @Column()
  video: string;

  @Column()
  description: string;

  @Column({ type: 'boolean', default: 'false' })
  isStopLesson: boolean;
}
