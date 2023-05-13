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
import { CourseModule } from '../entities/courseModule.entity';
import { UpdateLessonDto } from './dto/updateLesson.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(CourseModule)
    private readonly moduleRepository: Repository<CourseModule>,
  ) {}

  async getAll() {
    return await this.lessonRepository.find({
      relations: ['course', 'module'],
    });
  }

  async getOneLesson(id: number) {
    return await this.lessonRepository.findOne({
      where: { id },
      relations: ['course', 'module'],
    });
  }

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
    updateData: UpdateLessonDto,
  ): Promise<Lesson> {
    const lesson = await this.getLessonById(id);

    lesson.course = await this.findCourseById(updateData.course);
    lesson.module = await this.findModuleById(updateData.module);
    lesson.number = updateData.number;
    lesson.title = updateData.title;
    lesson.video = file
      ? '/uploads/course/lesson/video/' + file.filename
      : null;
    lesson.description = updateData.description;
    lesson.isStopLesson = updateData.isStopLesson;

    return this.lessonRepository.save(lesson);
  }

  async removeLesson(id: number) {
    await this.getLessonById(id);
    await this.lessonRepository.delete(id);
    return { message: `Lesson successfully deleted` };
  }

  private async getLessonById(id: number): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({ where: { id } });
    if (!lesson) {
      throw new NotFoundException('Lesson with id ${id} not found');
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

  private async findModuleById(id: number): Promise<CourseModule> {
    const module = await this.moduleRepository.findOne({ where: { id: id } });
    if (!module) {
      throw new NotFoundException('Module not found');
    }
    return module;
  }
}
