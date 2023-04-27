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
  Req,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from '../entities/lesson.entity';
import { Repository } from 'typeorm';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { StaffGuard } from '../auth/staff.guard';
import { TutorGuard } from '../auth/tutor.guard';
import { AddHomeworkDto } from './dto/addHomework.dto';
import { Homework } from '../entities/homework.entity';
import { User } from '../entities/user.entity';
import { Request } from 'express';

@Controller('homeworks')
export class HomeworksController {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(Homework)
    private readonly homeworkRepository: Repository<Homework>,
  ) {}

  @Get()
  async getAll() {
    return this.lessonRepository.find();
  }

  @Post()
  @UseGuards(TokenAuthGuard, TutorGuard)
  async createLesson(
    @Req() req: Request,
    @Body() homeworkData: AddHomeworkDto,
  ) {
    const user = req.user as User;
    const lesson = await this.lessonRepository.findOne({
      where: { id: homeworkData.lesson },
    });

    if (!lesson) {
      throw new BadRequestException('Lesson not found');
    }

    const homework = await this.homeworkRepository.create({
      lesson: lesson,
      title: homeworkData.title,
      description: homeworkData.description,
      tutorName: user.firstName,
      file: homeworkData.file,
    });
    return this.homeworkRepository.save(homework);
  }

  // @Patch()
  // @UseGuards(TokenAuthGuard, StaffGuard)
  // async updateLesson(
  //   @Param('id') id: number,
  //   @Body() updateLessonDto: UpdateLessonDto,
  // ) {
  //   const lesson = await this.lessonRepository.findOne({
  //     where: { id: id },
  //   });
  //
  //   const course = await this.courseRepository.findOne({
  //     where: { id: updateLessonDto.course },
  //   });
  //
  //   const module = await this.moduleRepository.findOne({
  //     where: { id: updateLessonDto.module },
  //   });
  //
  //   if (!course) {
  //     throw new BadRequestException('Course not found');
  //   }
  //
  //   if (!module) {
  //     throw new BadRequestException('Module not found');
  //   }
  //
  //   if (lesson) {
  //     lesson.course = course;
  //     lesson.module = module;
  //     lesson.number = updateLessonDto.number;
  //     lesson.title = updateLessonDto.title;
  //     lesson.video = updateLessonDto.video;
  //     lesson.description = updateLessonDto.description;
  //     lesson.isStopLesson = updateLessonDto.isStopLesson;
  //
  //     return this.lessonRepository.save(lesson);
  //   } else {
  //     throw new NotFoundException(`Lesson with id ${id} not found`);
  //   }
  // }
  //
  // @Get(':id')
  // async getOneLesson(@Param('id') id: number) {
  //   const { course, module, ...result } = await this.lessonRepository
  //     .createQueryBuilder('lesson')
  //     .leftJoinAndSelect('lesson.course', 'course')
  //     .leftJoinAndSelect('lesson.module', 'module')
  //     .select([
  //       'lesson.title',
  //       'lesson.duration',
  //       'lesson.price',
  //       'lesson.isGroup',
  //       'module.id',
  //       'course.id',
  //     ])
  //     .where('lesson.id = :id', { id })
  //     .getOne();
  //
  //   return {
  //     ...result,
  //     course: course.id.toString(),
  //     module: module.id.toString(),
  //   };
  // }
  //
  // @Delete(':id')
  // @UseGuards(TokenAuthGuard, StaffGuard)
  // async removeOneLesson(@Param('id') id: number) {
  //   const lesson: Lesson = await this.lessonRepository.findOne({
  //     where: { id: id },
  //   });
  //   if (lesson) {
  //     return this.lessonRepository.delete(id);
  //   } else {
  //     throw new NotFoundException(`Lesson with id ${id} not found`);
  //   }
  // }
}
