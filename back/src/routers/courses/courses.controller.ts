import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from '../../entities/course.entity';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { AddCourseDto } from './dto/addCourse.dto';
import { Category } from '../../entities/category.entity';
import { TokenAuthGuard } from '../../auth/token-auth.guard';
import { StaffGuard } from '../../auth/staff.guard';
import { UpdateCourseDto } from './dto/updateCourse.dto';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly coursesService: CoursesService,
  ) {}

  @Get()
  async getAll(): Promise<Course[]> {
    return this.coursesService.getAll();
  }

  @Post()
  @UseGuards(TokenAuthGuard, StaffGuard)
  async createCourse(@Body() courseData: AddCourseDto) {
    return this.coursesService.createCourse(courseData);
  }

  @Delete(':id')
  @UseGuards(TokenAuthGuard, StaffGuard)
  async removeOneCourse(@Param('id') id: number) {
    return this.coursesService.removeOneCourse(id);
  }

  @Patch(':id')
  @UseGuards(TokenAuthGuard, StaffGuard)
  async updateCourse(@Param('id') id: number, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.updateCourse(id, updateCourseDto);
  }

  @Get(':id')
  async getOneCourse(@Param('id') id: number) {
    return this.coursesService.getOneCourse(id);
  }
}
