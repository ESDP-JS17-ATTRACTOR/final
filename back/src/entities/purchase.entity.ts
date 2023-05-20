import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Course } from './course.entity';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  purchaser: User;

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @CreateDateColumn()
  purchasedAt: Date;

  @Column()
  expiredDate: Date;

  @BeforeInsert()
  async calculateExpiredDate() {
    const durationInMilliseconds = Number(this.course.duration) * 24 * 60 * 60 * 1000;
    this.expiredDate = new Date(this.course.startedAt.getTime() + durationInMilliseconds + 45 * 24 * 60 * 60 * 1000);
  }
}
