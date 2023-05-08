import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from '../entities/lesson.entity';
import { Homework } from '../entities/homework.entity';
import { AddHomeworkDto } from './dto/addHomework.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class HomeworksService {
  async createHomework(
    user: User,
    homeworkData: AddHomeworkDto,
    file: Express.Multer.File,
  ): Promise<Homework> {
    const lesson = await this.findLessonById(parseFloat(homeworkData.lesson));

    const homework = await this.homeworkRepository.create({
      lesson,
      title: homeworkData.title,
      date: new Date(),
      pdf: file ? '/uploads/homeworks/pdf/' + file.filename : null,
      description: homeworkData.description,
      tutorName: user.firstName,
      tutorEmail: user.email,
    });

    return this.homeworkRepository.save(homework);
  }

  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(Homework)
    private readonly homeworkRepository: Repository<Homework>,
  ) {}

  async removeOneHomework(id: number) {
    const homework: Homework = await this.homeworkRepository.findOne({
      where: { id },
    });
    if (!homework) {
      throw new NotFoundException(`Homework with id ${id} not found`);
    }
    await this.homeworkRepository.delete(id);
    return { message: `Homework with id ${id} deleted` };
  }

  async findLessonById(id: number): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({ where: { id: id } });
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    return lesson;
  }
}
