import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateHomeworkDto {
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNotEmpty()
  lesson: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;
}
