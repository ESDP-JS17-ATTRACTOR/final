import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from '../../entities/lesson.entity';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { UsersLesson } from '../../entities/usersLesson.entity';

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

  async getAll() {
    const usersLessons = await this.usersLessonRepository
      .createQueryBuilder('users_lesson')
      .leftJoinAndSelect('users_lesson.student', 'userId')
      .leftJoinAndSelect('users_lesson.lesson', 'lessonId')
      .select(['users_lesson', 'userId.id', 'lessonId'])
      .orderBy('lessonId.number', 'ASC')
      .getMany();

    if (!usersLessons.length) {
      throw new BadRequestException('No lessons at all!');
    }

    const index = usersLessons.findIndex(
      (el) => el.lesson.isStopLesson === true && el.viewed === false,
    );

    for (let i = 0; i <= index; i++) {
      usersLessons[i].available = true;
    }
    return usersLessons;
  }

  async createUsersLesson(user: User, courseId: number) {
    const lessons = await this.lessonRepository.find({
      where: { course: { id: courseId } },
    });

    console.log(user);

    if (!lessons || !user) {
      throw new NotFoundException('Lessons not found');
    }

    const usersLessons = [];

    for (let i = 0; i < lessons.length; i++) {
      const usersLesson = this.usersLessonRepository.create({
        student: user,
        lesson: lessons[i],
      });
      usersLessons.push(usersLesson);
    }
    return this.usersLessonRepository.save(usersLessons);
  }

  async updateUsersLesson(
    lessonId: number,
    isViewed: boolean,
  ): Promise<{ message: string }> {
    const lesson = await this.usersLessonRepository.findOne({
      where: { id: lessonId },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    if (isViewed) {
      lesson.viewed = true;
      await this.usersLessonRepository.save(lesson);
      return { message: 'Your lessons status changed to viewed!' };
    } else {
      throw new BadRequestException(
        'Invalid request: isViewed parameter should be true',
      );
    }
  }
}
