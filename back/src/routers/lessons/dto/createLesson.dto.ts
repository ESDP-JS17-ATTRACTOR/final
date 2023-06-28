import { Entity } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@Entity()
export class CreateLessonDto {
  @IsNotEmpty()
  course: string;

  @IsNotEmpty()
  module: string;

  @IsNotEmpty()
  number: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  isStopLesson: string;
}
