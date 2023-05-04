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
  homework: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  studentName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  isChecked: string;

  @IsOptional()
  @IsNotEmpty()
  file: string;
}
