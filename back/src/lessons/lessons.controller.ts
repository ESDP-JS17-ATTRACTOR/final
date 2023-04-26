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
import { Lesson } from '../entities/lesson.entity';
import { Repository } from 'typeorm';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { StaffGuard } from '../auth/staff.guard';
import { CreateLessonDto } from './dto/createLesson.dto';
import { Course } from '../entities/course.entity';
import { Module } from '../entities/module.entity';
import { UpdateLessonDto } from './dto/updateLesson.dto';

@Controller('lessons')
export class LessonsController {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Module)
    private readonly moduleRepository: Repository<Module>,
  ) {}

  @Get()
  async getAll() {
    return this.lessonRepository.find();
  }

  @Post()
  @UseGuards(TokenAuthGuard, StaffGuard)
  async createLesson(@Body() lessonData: CreateLessonDto) {
    const existLesson = await this.lessonRepository.findOne({
      where: { title: lessonData.title },
    });

    const course = await this.courseRepository.findOne({
      where: { id: lessonData.course },
    });

    const module = await this.moduleRepository.findOne({
      where: { id: lessonData.module },
    });

    if (existLesson) {
      throw new BadRequestException('This lesson is already registered');
    }

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    if (!module) {
      throw new BadRequestException('Module not found');
    }

    const lesson = await this.lessonRepository.create({
      course: course,
      module: module,
      number: lessonData.number,
      title: lessonData.title,
      video: lessonData.video,
      description: lessonData.description,
      isStopLesson: lessonData.isStopLesson,
    });
    return this.lessonRepository.save(lesson);
  }

  @Patch()
  @UseGuards(TokenAuthGuard, StaffGuard)
  async updateLesson(
    @Param('id') id: number,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    const lesson = await this.lessonRepository.findOne({
      where: { id: id },
    });

    const course = await this.courseRepository.findOne({
      where: { id: updateLessonDto.course },
    });

    const module = await this.moduleRepository.findOne({
      where: { id: updateLessonDto.module },
    });

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    if (!module) {
      throw new BadRequestException('Module not found');
    }

    if (lesson) {
      lesson.course = course;
      lesson.module = module;
      lesson.number = updateLessonDto.number;
      lesson.title = updateLessonDto.title;
      lesson.video = updateLessonDto.video;
      lesson.description = updateLessonDto.description;
      lesson.isStopLesson = updateLessonDto.isStopLesson;

      return this.lessonRepository.save(lesson);
    } else {
      throw new NotFoundException(`Lesson with id ${id} not found`);
    }
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
