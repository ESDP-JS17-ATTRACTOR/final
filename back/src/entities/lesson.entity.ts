import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './course.entity';
import { CourseModule } from './courseModule.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @ManyToOne(() => CourseModule)
  @JoinColumn({ name: 'moduleId' })
  module: CourseModule;

  @Column()
  number: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  video: string | null;

  @Column()
  description: string;

  @Column({ type: 'boolean', default: 'false' })
  isStopLesson: boolean;
}
