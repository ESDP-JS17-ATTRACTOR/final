import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateHomeworkDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  lesson: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  tutorName: string;

  @IsOptional()
  @IsNotEmpty()
  file: string;
}
