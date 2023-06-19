import { Entity } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Entity()
export class CreateCourseModuleDto {
  @IsNotEmpty()
  @IsNumber()
  course: number;

  @IsNotEmpty()
  @IsNumber()
  number: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
