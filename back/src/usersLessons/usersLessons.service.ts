import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from '../entities/lesson.entity';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UsersLesson } from '../entities/usersLesson.entity';

@Injectable()
export class UsersLessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UsersLesson)
    private readonly usersLessonRepository: Repository<UsersLesson>,
  ) {}

  async getAll(userId: number, moduleId: number) {
    if (moduleId) {
      const lessons = await this.usersLessonRepository
        .createQueryBuilder('users_lesson')
        .where('users_lesson.userId = :userId', { userId })
        .leftJoinAndSelect('users_lesson.lesson', 'lesson')
        .select(['users_lesson', 'lesson'])
        .leftJoinAndSelect('lesson.module', 'module')
        .where('module.id = :moduleId', { moduleId })
        .orderBy('lesson.number', 'ASC')
        .getMany();
      if (!lessons.length) {
        throw new NotFoundException('There is no lessons on this module');
      }

      const responseUsersLessons = [];

      for (let i = 0; i < lessons.length; i++) {
        const lesson = {
          id: lessons[i].id,
          number: lessons[i].lesson.number,
          description: lessons[i].lesson.description,
          title: lessons[i].lesson.title,
          video: lessons[i].lesson.video,
          isViewed: lessons[i].isViewed,
          viewedAt: lessons[i].viewedAt,
          isStopLesson: lessons[i].lesson.isStopLesson,
          isAvailable: lessons[i].isAvailable,
          moduleNumber: lessons[i].lesson.module.number,
        };
        responseUsersLessons.push(lesson);
      }

      return responseUsersLessons;
    }

    const usersLessons = await this.usersLessonRepository
      .createQueryBuilder('users_lesson')
      .where('users_lesson.userId = :userId', { userId })
      .leftJoinAndSelect('users_lesson.student', 'userId')
      .leftJoinAndSelect('users_lesson.lesson', 'lesson')
      .select(['users_lesson', 'userId.id', 'lessonId'])
      .leftJoinAndSelect('lesson.course', 'course')
      .leftJoinAndSelect('lesson.module', 'module')
      .orderBy('lessonId.number', 'ASC')
      .getMany();

    if (!usersLessons.length) {
      throw new NotFoundException('No lessons at all!');
    }

    const index = usersLessons.findIndex(
      (el) => el.lesson.isStopLesson === true && el.isViewed === false,
    );

    for (let i = 0; i <= index; i++) {
      usersLessons[i].isAvailable = true;
    }
    return usersLessons;
  }

  async createUsersLesson(user: User, courseId: number) {
    const lessons = await this.lessonRepository.find({
      where: { course: { id: courseId } },
    });

    if (!lessons.length || !user) {
      throw new NotFoundException('Lessons/user not found');
    }

    const usersLessons = [];

    for (let i = 0; i < lessons.length; i++) {
      const existingRecord = await this.usersLessonRepository.findOne({
        where: {
          student: { id: user.id },
          lesson: { id: lessons[i].id },
        },
      });

      if (!existingRecord) {
        const usersLesson = this.usersLessonRepository.create({
          student: user,
          lesson: lessons[i],
        });
        usersLessons.push(usersLesson);
      }
    }
    if (!usersLessons.length) {
      throw new BadRequestException('No lessons matched');
    }
    return this.usersLessonRepository.save(usersLessons);
  }

  async updateUsersLesson(
    id: number,
    isViewed: boolean,
  ): Promise<{ message: string }> {
    const lesson = await this.usersLessonRepository.findOne({
      where: { id },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found!');
    }

    if (isViewed) {
      lesson.isViewed = true;
      lesson.viewedAt = new Date();
      await this.usersLessonRepository.save(lesson);
      return { message: 'Your lessons status changed to viewed!' };
    } else {
      throw new BadRequestException(
        'Invalid request: isViewed parameter should be true',
      );
    }
  }
}
