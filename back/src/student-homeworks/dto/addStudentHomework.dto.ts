import { Column, Entity } from 'typeorm';
import { IsNotEmpty, IsNumber } from 'class-validator';

@Entity()
export class AddStudentHomeworkDto {
  @IsNotEmpty()
  @IsNumber()
  homework: number;

  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  @Column({ default: 'in Process', enum: ['in Process', 'Done'] })
  status: string;

  @IsNotEmpty()
  studentName: string;

  @IsNotEmpty()
  @Column({ default: 'Not checked', enum: ['Not checked', 'Checked'] })
  isChecked: string;

  @IsNotEmpty()
  file: string;
}
