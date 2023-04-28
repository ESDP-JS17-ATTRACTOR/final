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

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  tutorName: string;

  @IsNotEmpty()
  file: string;
}
