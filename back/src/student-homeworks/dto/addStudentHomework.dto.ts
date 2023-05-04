import { Column, Entity } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

@Entity()
export class AddStudentHomeworkDto {
  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  homework: string;

  date: Date;

  @Column({ default: 'Done' })
  status: string;

  studentName: string;

  studentEmail: string;

  @Column({ default: 'Not checked', enum: ['Not checked', 'Checked'] })
  isChecked: string;
}
