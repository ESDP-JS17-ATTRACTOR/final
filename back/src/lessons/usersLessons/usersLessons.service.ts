import { Injectable, NotFoundException } from '@nestjs/common';
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

  async createUsersLesson(user: User, courseId: number) {
    const lessons = await this.lessonRepository.find({
      where: { course: { id: courseId } },
    });

    if (!lessons) {
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
}
