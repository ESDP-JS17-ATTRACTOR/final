import { Entity } from 'typeorm';
import { IsNotEmpty, IsNumber } from 'class-validator';

@Entity()
export class AddHomeworkDto {
  @IsNotEmpty()
  @IsNumber()
  lesson: number;

  @IsNotEmpty()
  title: string;

  date: Date;

  @IsNotEmpty()
  description: string;

  tutorName: string;

  tutorEmail: string;

  // @IsNotEmpty()
  // pdf: string | null;
}
