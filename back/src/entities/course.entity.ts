import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'tutorId' })
  tutor: User;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'timestamp' })
  startedAt: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  duration: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  price: string;

  @Column({ type: 'boolean', default: false })
  isGroup: boolean;
}
