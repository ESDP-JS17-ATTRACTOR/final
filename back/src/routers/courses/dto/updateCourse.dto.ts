import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCourseDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  tutor: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  category: number;

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
  duration: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  price: string;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isGroup: boolean;

  @IsOptional()
  // @IsDate()
  @IsDateString()
  @IsNotEmpty()
  startedAt: Date;
}
