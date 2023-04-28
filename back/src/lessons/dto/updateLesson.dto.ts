import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateLessonDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  course: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  module: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  number: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isStopLesson: boolean;
}
