import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from '../entities/course.entity';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { AddCourseDto } from './dto/addCourse.dto';
import { Category } from '../entities/category.entity';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { StaffGuard } from '../auth/staff.guard';
import { UpdateCourseDto } from './dto/updateCourse.dto';

@Controller('courses')
export class CoursesController {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  @Get()
  async getAll(): Promise<Course[]> {
    return this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.category', 'category')
      .leftJoinAndSelect('course.tutor', 'tutor')
      .select([
        'course',
        'tutor.id',
        'tutor.firstName',
        'tutor.lastName',
        'category',
      ])
      .getMany();
  }

  @Post()
  async createCourse(@Body() courseData: AddCourseDto) {
    const existCourse = await this.courseRepository.findOne({
      where: { title: courseData.title },
    });

    const user = await this.userRepository.findOne({
      where: { id: courseData.tutor },
    });
    const category = await this.categoryRepository.findOne({
      where: { id: courseData.category },
    });
    if (existCourse) {
      throw new BadRequestException('This course is already registered');
    }

    if (!user) {
      throw new BadRequestException('Tutor not found');
    }

    if (!category) {
      throw new BadRequestException('Category not found');
    }

    const course = this.courseRepository.create({
      tutor: user,
      category: category,
      title: courseData.title,
      duration: courseData.duration,
      price: courseData.price,
      isGroup: courseData.isGroup,
    });
    return this.courseRepository.save(course);
  }

  @Delete(':id')
  @UseGuards(TokenAuthGuard, StaffGuard)
  async removeOneCourse(@Param('id') id: number) {
    const course: Course = await this.courseRepository.findOne({
      where: { id: id },
    });
    if (course) {
      return this.courseRepository.delete(id);
    } else {
      throw new NotFoundException(`Course with id ${id} not found`);
    }
  }

  @Patch(':id')
  @UseGuards(TokenAuthGuard, StaffGuard)
  async updateCourse(
    @Param('id') id: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    const course = await this.courseRepository.findOne({
      where: { id: id },
    });

    const user = await this.userRepository.findOne({
      where: { id: updateCourseDto.tutor },
    });
    const category = await this.categoryRepository.findOne({
      where: { id: updateCourseDto.category },
    });
    if (!user) {
      throw new BadRequestException('Tutor not found');
    }
    if (!category) {
      throw new BadRequestException('Category not found');
    }
    if (course) {
      course.tutor = user;
      course.category = category;
      course.title = updateCourseDto.title;
      course.duration = updateCourseDto.duration;
      course.price = updateCourseDto.price;
      course.isGroup = updateCourseDto.isGroup;

      return this.courseRepository.save(course);
    } else {
      throw new NotFoundException(`Course with id ${id} not found`);
    }
  }

  @Get(':id')
  async getOneCourse(@Param('id') id: number) {
    return this.courseRepository.findOne({
      where: { id: id },
    });
  }
}
