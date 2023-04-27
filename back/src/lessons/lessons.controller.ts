import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
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
import { Module } from '../entities/module.entity';
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
    @InjectRepository(Module)
    private readonly moduleRepository: Repository<Module>,
    private readonly lessonsService: LessonsService,
  ) {}

  @Get()
  async getAll() {
    return this.lessonRepository.find();
  }

  @Post()
  @UseGuards(TokenAuthGuard, StaffGuard)
  @UseInterceptors(
    FileInterceptor('image', { dest: './public/uploads/course/lessons/video' }),
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
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    return this.lessonsService.updateLesson(id, file, updateLessonDto);
  }

  @Get(':id')
  async getOneLesson(@Param('id') id: number) {
    const { course, module, ...result } = await this.lessonRepository
      .createQueryBuilder('lesson')
      .leftJoinAndSelect('lesson.course', 'course')
      .leftJoinAndSelect('lesson.module', 'module')
      .select([
        'lesson.title',
        'lesson.duration',
        'lesson.price',
        'lesson.isGroup',
        'module.id',
        'course.id',
      ])
      .where('lesson.id = :id', { id })
      .getOne();

    return {
      ...result,
      course: course.id.toString(),
      module: module.id.toString(),
    };
  }

  @Delete(':id')
  @UseGuards(TokenAuthGuard, StaffGuard)
  async removeOneLesson(@Param('id') id: number) {
    const lesson: Lesson = await this.lessonRepository.findOne({
      where: { id: id },
    });
    if (lesson) {
      return this.lessonRepository.delete(id);
    } else {
      throw new NotFoundException(`Lesson with id ${id} not found`);
    }
  }
}
