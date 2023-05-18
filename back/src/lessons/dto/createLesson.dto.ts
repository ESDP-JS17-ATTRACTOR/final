import { Entity } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  isStopLesson: boolean;
}
