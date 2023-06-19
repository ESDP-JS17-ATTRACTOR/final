import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from '../entities/lesson.entity';
import { Homework } from '../entities/homework.entity';
import { AddHomeworkDto } from './dto/addHomework.dto';
import { User } from '../entities/user.entity';
import { UpdateHomeworkDto } from './dto/updateHomework.dto';
import { StudentHomework } from '../entities/studentHomework.entity';

@Injectable()
export class HomeworksService {
  async createHomework(user: User, homeworkData: AddHomeworkDto, file: Express.Multer.File): Promise<Homework> {
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
    @InjectRepository(StudentHomework)
    private readonly studentHomeworkRepository: Repository<StudentHomework>,
  ) {}

  async updateHomework(id: number, file: Express.Multer.File, homeworkData: UpdateHomeworkDto): Promise<Homework> {
    const homework = await this.ifExistReturnsHomework(id);

    homework.lesson = await this.findLessonById(parseFloat(homeworkData.lesson));
    homework.title = homeworkData.title;
    homework.description = homeworkData.description;
    homework.pdf = file ? '/uploads/homeworks/pdf/' + file.filename : null;

    return this.homeworkRepository.save(homework);
  }

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

  private async ifExistReturnsHomework(id: number): Promise<Homework> {
    const homework = await this.homeworkRepository.findOne({ where: { id } });
    if (!homework) {
      throw new NotFoundException('Homework not found');
    }
    return homework;
  }

  async findLessonById(id: number): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({ where: { id: id } });
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    return lesson;
  }

  async getTutorsHomeworks(user: User) {
    const email = user.email;
    return this.studentHomeworkRepository
      .createQueryBuilder('studentHomework')
      .innerJoin('studentHomework.homework', 'homework')
      .where('homework.tutorEmail = :tutorEmail', { tutorEmail: email })
      .getMany();
  }

  async getTutorHomeworkById(user: User, id: number) {
    const email = user.email;
    return this.studentHomeworkRepository
      .createQueryBuilder('studentHomework')
      .innerJoin('studentHomework.homework', 'homework')
      .where('homework.tutorEmail = :tutorEmail', { tutorEmail: email })
      .andWhere('studentHomework.id = :id', { id })
      .getOne();
  }
}
