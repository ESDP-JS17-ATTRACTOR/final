import { Column, Entity } from 'typeorm';
import { IsNotEmpty, IsNumber } from 'class-validator';

@Entity()
export class AddStudentHomeworkDto {
  @IsNotEmpty()
  @IsNumber()
  homework: number;

  date: Date;

  @Column({ default: 'Done' })
  status: string;

  studentName: string;

  @Column({ default: 'Not checked', enum: ['Not checked', 'Checked'] })
  isChecked: string;

  // @IsNotEmpty()
  // file: string;
}
