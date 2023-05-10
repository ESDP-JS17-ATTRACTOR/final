import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './course.entity';

@Entity()
export class CourseModule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @Column()
  number: number;

  @Column()
  title: string;

  @Column()
  description: string;
}
