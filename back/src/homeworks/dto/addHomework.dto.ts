import { Entity } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

@Entity()
export class AddHomeworkDto {
  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  lesson: string;

  @IsNotEmpty()
  title: string;

  date: Date;

  @IsNotEmpty()
  description: string;

  tutorName: string;

  tutorEmail: string;
}
