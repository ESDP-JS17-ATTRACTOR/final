import { Entity } from 'typeorm';
import { IsNotEmpty, IsNumber } from 'class-validator';

@Entity()
export class AddHomeworkDto {
  @IsNotEmpty()
  @IsNumber()
  lesson: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  date: Date;

  // @IsNotEmpty()
  // status: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  tutorName: string;

  // @IsNotEmpty()
  // studentName: string;
  //
  // @IsNotEmpty()
  // isChecked: string;

  @IsNotEmpty()
  file: string;
}
