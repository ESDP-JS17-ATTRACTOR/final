import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCourseDto {
  @IsOptional()
  @IsNumber()
  tutor: number;

  @IsOptional()
  @IsNumber()
  category: number;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  duration: string;

  @IsOptional()
  @IsString()
  price: string;

  @IsOptional()
  @IsBoolean()
  isGroup: boolean;
}
