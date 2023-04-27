import { Column, Entity } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

@Entity()
export class CreateLessonDto {
  @IsNotEmpty()
  @IsNumber()
  course: number;

  @IsNotEmpty()
  @IsNumber()
  module: number;

  @IsNotEmpty()
  @IsNumber()
  number: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @Column({ type: 'boolean', default: 'false' })
  @IsBoolean()
  isStopLesson: boolean;
}
