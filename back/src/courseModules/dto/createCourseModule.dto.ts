import { Entity } from 'typeorm';
import { IsNotEmpty, IsNumber } from 'class-validator';

@Entity()
export class CreateCourseModuleDto {
  @IsNotEmpty()
  @IsNumber()
  course: number;

  @IsNotEmpty()
  @IsNumber()
  number: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
