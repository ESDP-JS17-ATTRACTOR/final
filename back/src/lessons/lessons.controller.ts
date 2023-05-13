import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from '../entities/lesson.entity';
import { Repository } from 'typeorm';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { StaffGuard } from '../auth/staff.guard';
import { CreateLessonDto } from './dto/createLesson.dto';
import { Course } from '../entities/course.entity';
import { CourseModule } from '../entities/courseModule.entity';
import { UpdateLessonDto } from './dto/updateLesson.dto';
import { LessonsService } from './lessons.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('lessons')
export class LessonsController {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(CourseModule)
    private readonly courseModulesRepository: Repository<CourseModule>,
    private readonly lessonsService: LessonsService,
  ) {}

  @Get()
  async getAll() {
    return this.lessonsService.getAll();
  }

  @Get(':id')
  async getOneLesson(@Param('id') id: number) {
    return this.lessonsService.getOneLesson(id);
  }

  @Post()
  @UseGuards(TokenAuthGuard, StaffGuard)
  @UseInterceptors(
    FileInterceptor('video', { dest: './public/uploads/course/lessons/video' }),
  )
  async createLesson(
    @UploadedFile() file: Express.Multer.File,
    @Body() lessonData: CreateLessonDto,
  ) {
    return this.lessonsService.createLesson(lessonData, file);
  }

  @Patch(':id')
  @UseGuards(TokenAuthGuard, StaffGuard)
  @UseInterceptors(
    FileInterceptor('image', { dest: './public/uploads/course/lessons/video' }),
  )
  async updateLesson(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateData: UpdateLessonDto,
  ) {
    return this.lessonsService.updateLesson(id, file, updateData);
  }

  @Delete(':id')
  @UseGuards(TokenAuthGuard, StaffGuard)
  async removeOneLesson(@Param('id') id: number) {
    return this.lessonsService.removeLesson(id);
  }
}
