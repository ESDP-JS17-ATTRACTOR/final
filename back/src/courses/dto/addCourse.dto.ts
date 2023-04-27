import { IsNotEmpty } from 'class-validator';

export class AddCourseDto {
  @IsNotEmpty()
  tutor: number;

  @IsNotEmpty()
  category: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  duration: string;

  @IsNotEmpty()
  price: string;

  @IsNotEmpty()
  isGroup: boolean;

  @IsNotEmpty()
  startedAt: string;
}
