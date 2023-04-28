import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLessonDto } from './dto/createLesson.dto';
import { Lesson } from '../entities/lesson.entity';
import { Course } from '../entities/course.entity';
import { Module } from '../entities/module.entity';
import { UpdateLessonDto } from './dto/updateLesson.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Module)
    private readonly moduleRepository: Repository<Module>,
  ) {}

  async createLesson(
    lessonData: CreateLessonDto,
    file: Express.Multer.File,
  ): Promise<Lesson> {
    await this.checkForExistLesson(lessonData.title);

    const [course, module] = await Promise.all([
      this.findCourseById(lessonData.course),
      this.findModuleById(lessonData.module),
    ]);

    const lesson = await this.lessonRepository.create({
      course,
      module,
      number: lessonData.number,
      title: lessonData.title,
      video: file ? '/uploads/course/lesson/video/' + file.filename : null,
      description: lessonData.description,
      isStopLesson: lessonData.isStopLesson,
    });

    return this.lessonRepository.save(lesson);
  }

  async updateLesson(
    id: number,
    file: Express.Multer.File,
    lessonData: UpdateLessonDto,
  ): Promise<Lesson> {
    const lesson = await this.ifExistReturnsLesson(id);

    const [course, module] = await Promise.all([
      this.findCourseById(lessonData.course),
      this.findModuleById(lessonData.module),
    ]);

    lesson.course = course;
    lesson.module = module;
    lesson.number = lessonData.number;
    lesson.title = lessonData.title;
    lesson.video = file
      ? '/uploads/course/lesson/video/' + file.filename
      : null;
    lesson.description = lessonData.description;
    lesson.isStopLesson = lessonData.isStopLesson;

    return this.lessonRepository.save(lesson);
  }

  async removeLesson(id: number) {
    const lesson: Lesson = await this.lessonRepository.findOne({
      where: { id },
    });
    if (lesson) {
      await this.lessonRepository.delete(id);
      return { message: `Lesson with id ${id} deleted` };
    } else {
      throw new NotFoundException(`Lesson with id ${id} not found`);
    }
  }

  private async ifExistReturnsLesson(id: number): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({ where: { id } });
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    return lesson;
  }

  private async checkForExistLesson(title: string): Promise<void> {
    const lesson = await this.lessonRepository.findOne({ where: { title } });
    if (lesson) {
      throw new BadRequestException('This lesson is already registered');
    }
  }

  private async findCourseById(id: number): Promise<Course> {
    const course = await this.courseRepository.findOne({ where: { id: id } });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  private async findModuleById(id: number): Promise<Module> {
    const module = await this.moduleRepository.findOne({ where: { id: id } });
    if (!module) {
      throw new NotFoundException('Module not found');
    }
    return module;
  }
}
